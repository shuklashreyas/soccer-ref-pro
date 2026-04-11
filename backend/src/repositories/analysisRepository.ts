import type { AnalysisRecord } from "../models/analysis.js";

class AnalysisRepository {
  private readonly store = new Map<string, AnalysisRecord>();

  create(record: AnalysisRecord) {
    this.store.set(record.id, record);
    return record;
  }

  update(id: string, patch: Partial<AnalysisRecord>) {
    const current = this.store.get(id);
    if (!current) {
      return null;
    }

    const updated: AnalysisRecord = {
      ...current,
      ...patch,
    };

    this.store.set(id, updated);
    return updated;
  }

  getById(id: string) {
    return this.store.get(id) ?? null;
  }

  list() {
    return [...this.store.values()].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  }
}

export const analysisRepository = new AnalysisRepository();
