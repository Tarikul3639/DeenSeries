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

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) return [];

      return parsed as WatchHistoryEntry[];
    } catch {
      return [];
    }
  }

  async save(entry: WatchHistoryEntry): Promise<void> {
    if (typeof window === "undefined") return;

    const history = await this.getAll();

    // One record per movie / series
    const index = history.findIndex(
      (item) => item.type === entry.type && item.contentId === entry.contentId
    );

    if (index !== -1) {
      history[index] = {
        ...history[index],
        ...entry,
        updatedAt: Date.now(),
      };
    } else {
      history.push({
        ...entry,
        updatedAt: Date.now(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }

  async remove(type: "movie" | "series", contentId: string): Promise<void> {
    if (typeof window === "undefined") return;

    const history = await this.getAll();

    const filtered = history.filter(
      (item) => !(item.type === type && item.contentId === contentId)
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEY);
  }
}