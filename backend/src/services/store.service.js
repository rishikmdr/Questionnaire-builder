// Simple in-memory store for questionnaires
// In production, replace with database (MongoDB, PostgreSQL, etc.)

class Store {
  constructor() {
    this.questionnaires = new Map();
  }

  save(questionnaire) {
    if (!questionnaire.id) {
      throw new Error('Questionnaire must have an ID');
    }
    this.questionnaires.set(questionnaire.id, questionnaire);
    return questionnaire;
  }

  get(id) {
    return this.questionnaires.get(id);
  }

  getAll() {
    return Array.from(this.questionnaires.values());
  }

  delete(id) {
    return this.questionnaires.delete(id);
  }

  update(id, data) {
    const existing = this.get(id);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }
    const updated = { ...existing, ...data, id };
    this.questionnaires.set(id, updated);
    return updated;
  }

  clear() {
    this.questionnaires.clear();
  }

  size() {
    return this.questionnaires.size;
  }
}

export const QuestionnaireStore = new Store();