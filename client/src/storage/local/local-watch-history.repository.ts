import {
  WatchHistoryEntry,
  WatchHistoryRepository,
} from "../repositories/watch-history.repository";

const STORAGE_KEY = "deenseries-watch-history";

export class LocalWatchHistoryRepository implements WatchHistoryRepository {
  async getAll(): Promise<WatchHistoryEntry[]> {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as WatchHistoryEntry[];
    } catch {
      return [];
    }
  }

  async save(entry: WatchHistoryEntry): Promise<void> {
    if (typeof window === "undefined") return;
    const all = await this.getAll();
    const existingIndex = all.findIndex((e) => e.contentId === entry.contentId);
    if (existingIndex >= 0) {
      // Update existing record
      all[existingIndex] = entry;
    } else {
      all.push(entry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  async remove(contentId: string): Promise<void> {
    if (typeof window === "undefined") return;
    const all = await this.getAll();
    const filtered = all.filter((e) => e.contentId !== contentId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
