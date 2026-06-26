// Storage repository interface for watch history
// Can be swapped with an API implementation later

export interface WatchHistoryEntry {
  type: "movie" | "series";
  contentId: string;
  title: string;
  thumbnail?: string;
  updatedAt: number; // timestamp
  // Series-only fields
  episodeId?: string;
  episodeNumber?: number;
}

export interface WatchHistoryRepository {
  getAll(): Promise<WatchHistoryEntry[]>;
  save(entry: WatchHistoryEntry): Promise<void>;
  remove(contentId: string): Promise<void>;
  clear(): Promise<void>;
}
