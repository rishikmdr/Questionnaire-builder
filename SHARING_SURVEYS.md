# 📤 Sharing Your Questionnaires

## Current Status
This application is a **Questionnaire Builder**, not a survey hosting platform. It generates professional questionnaires that you can then deploy on actual survey platforms.

## How to Share Your Surveys

### Option 1: Export and Upload to Survey Platforms

1. **Generate your questionnaire** in the AI Questionnaire Builder
2. **Export to Word** using the Export button
3. **Upload to a survey platform:**
   - **Qualtrics** (Enterprise) - https://www.qualtrics.com
   - **SurveyMonkey** - https://www.surveymonkey.com
   - **Google Forms** (Free) - https://forms.google.com
   - **Typeform** - https://www.typeform.com
   - **Microsoft Forms** - https://forms.microsoft.com
   - **LimeSurvey** (Open source) - https://www.limesurvey.org

### Option 2: Use the JSON Export

1. Click **Export as JSON** in the application
2. Use the JSON to programmatically create surveys in platforms that support API integration:
   ```json
   {
     "sections": [...],
     "questions": [...],
     "logic": [...]
   }
   ```

### Option 3: Future Enhancement - Built-in Survey Hosting

To add survey hosting capabilities to this application, you would need:

#### Backend Requirements:
- Database to store responses (PostgreSQL/MongoDB)
- Response collection endpoints
- Unique survey links generation
- Response analytics

#### Frontend Requirements:
- Public survey-taking interface
- Response validation
- Progress tracking
- Thank you page

#### Implementation Steps:

1. **Add Survey Publishing Feature:**
   ```javascript
   // Backend route
   app.post('/api/survey/publish', async (req, res) => {
     const { questionnaireId } = req.body;
     const surveyLink = generateUniqueLink();
     // Save to database
     res.json({ surveyLink: `https://yourdomain.com/survey/${surveyLink}` });
   });
   ```

2. **Create Public Survey Route:**
   ```javascript
   // Public survey page
   app.get('/survey/:id', (req, res) => {
     // Serve public survey interface
   });
   ```

3. **Add Response Collection:**
   ```javascript
   app.post('/api/survey/:id/response', async (req, res) => {
     // Save responses to database
   });
   ```

### Option 4: Quick Sharing via Third-Party Integration

For immediate sharing needs, integrate with existing platforms:

1. **SurveyMonkey API Integration:**
   ```javascript
   const createSurveyMonkey = async (questionnaire) => {
     const response = await fetch('https://api.surveymonkey.com/v3/surveys', {
       method: 'POST',
       headers: {
         'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(convertToSurveyMonkeyFormat(questionnaire))
     });
     return response.json();
   };
   ```

2. **Google Forms Integration:**
   - Use Google Forms API to create forms programmatically
   - Get shareable link automatically

### Option 5: Generate Static HTML Survey

Create a simple HTML version that can be shared:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Survey</title>
</head>
<body>
    <form action="https://formspree.io/your@email.com" method="POST">
        <!-- Your questions here -->
        <button type="submit">Submit</button>
    </form>
</body>
</html>
```

## Recommended Approach

For immediate needs:
1. **Export to Word** → Upload to **Google Forms** (free & easy)
2. Share the Google Forms link with respondents
3. Collect responses in Google Sheets

For professional needs:
1. Export questionnaire
2. Import into **Qualtrics** or **SurveyMonkey**
3. Use their advanced distribution features

## Future Development

To make this application support direct survey sharing:

### Phase 1: Basic Sharing
- Generate unique survey links
- Create public survey-taking interface
- Store responses in database

### Phase 2: Advanced Features
- Email distribution
- Response tracking
- Real-time analytics
- Export responses to Excel/CSV

### Phase 3: Enterprise Features
- Custom branding
- Advanced logic implementation
- Panel integration
- Statistical analysis

## Quick Workaround

While the sharing feature is not built-in, you can:

1. **Copy the questionnaire text** from the preview
2. **Paste into Google Forms** or any survey tool
3. **Share the link** from that platform

This way, you can start collecting responses immediately while maintaining the professional quality of your AI-generated questionnaire.