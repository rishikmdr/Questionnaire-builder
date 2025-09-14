import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { QuestionnaireStore } from '../services/store.service.js';

export const exportToWord = async (req, res, next) => {
  try {
    const { questionnaireId } = req.params;
    const questionnaire = QuestionnaireStore.get(questionnaireId);
    
    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      });
    }

    // Create Word document
    const doc = new Document({
      sections: [{
        properties: {},
        children: generateDocumentContent(questionnaire)
      }]
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=questionnaire_${questionnaireId}.docx`);
    
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const exportToJSON = async (req, res, next) => {
  try {
    const { questionnaireId } = req.params;
    const questionnaire = QuestionnaireStore.get(questionnaireId);
    
    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      });
    }

    res.json({
      success: true,
      data: questionnaire
    });
  } catch (error) {
    next(error);
  }
};

function generateDocumentContent(questionnaire) {
  const content = [];
  
  // Title
  content.push(
    new Paragraph({
      text: 'Market Research Questionnaire',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // Metadata
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated: ${new Date(questionnaire.createdAt).toLocaleDateString()}`,
          italics: true
        })
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Total Questions: ${questionnaire.metadata.totalQuestions}`,
          italics: true
        })
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Estimated Time: ${questionnaire.metadata.estimatedTime}`,
          italics: true
        })
      ],
      spacing: { after: 400 }
    })
  );

  // Sections and questions
  let questionNumber = 1;
  
  questionnaire.sections.forEach(section => {
    // Section title
    content.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    );

    // Section description
    if (section.description) {
      content.push(
        new Paragraph({
          text: section.description,
          italics: true,
          spacing: { after: 200 }
        })
      );
    }

    // Questions
    section.questions.forEach(question => {
      // Question logic
      if (question.logic) {
        content.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `[Logic: ${question.logic}]`,
                italics: true,
                color: '666666'
              })
            ],
            spacing: { before: 100 }
          })
        );
      }

      // Question text
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Q${questionNumber}. ${question.text}`,
              bold: true
            })
          ],
          spacing: { before: 200, after: 100 }
        })
      );

      // Question type
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Type: ${formatQuestionType(question.type)}`,
              italics: true,
              size: 20
            })
          ],
          spacing: { after: 100 }
        })
      );

      // Options
      if (question.options && question.options.length > 0) {
        question.options.forEach((option, index) => {
          content.push(
            new Paragraph({
              text: `  ${String.fromCharCode(65 + index)}. ${option}`,
              spacing: { before: 50 }
            })
          );
        });
      }

      // Add spacing after question
      content.push(
        new Paragraph({
          text: '',
          spacing: { after: 200 }
        })
      );

      questionNumber++;
    });
  });

  return content;
}

function formatQuestionType(type) {
  const typeMap = {
    single: 'Single Response',
    multi: 'Multiple Response',
    grid: 'Grid/Matrix',
    text: 'Open Text',
    ranking: 'Ranking',
    scale: 'Scale',
    dropdown: 'Dropdown'
  };
  return typeMap[type] || type;
}