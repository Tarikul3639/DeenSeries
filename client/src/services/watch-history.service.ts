import {
  WatchHistoryEntry,
  WatchHistoryRepository,
} from "../storage/repositories/watch-history.repository";
import { LocalWatchHistoryRepository } from "../storage/local/local-watch-history.repository";

// Singleton repository instance — swap this for API implementation later
const repository: WatchHistoryRepository = new LocalWatchHistoryRepository();

export interface SaveMovieInput {
  contentId: string;
  title: string;
  thumbnail?: string;
  description?: string;
}

export interface SaveSeriesInput {
  contentId: string;
  title: string;
  thumbnail?: string;
  description?: string;
  episodeId: string;
  episodeNumber: number;
}

class WatchHistoryService {
  async getAll(): Promise<WatchHistoryEntry[]> {
    return repository.getAll();
  }

  async getLatest(): Promise<WatchHistoryEntry | null> {
    const all = await repository.getAll();
    if (all.length === 0) return null;
    return all.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }

  async saveMovie(input: SaveMovieInput): Promise<void> {
    const entry: WatchHistoryEntry = {
      type: "movie",
      contentId: input.contentId,
      title: input.title,
      description: input.description,
      thumbnail: input.thumbnail,
      updatedAt: Date.now(),
    };
    await repository.save(entry);
  }

  async saveSeries(input: SaveSeriesInput): Promise<void> {
    const entry: WatchHistoryEntry = {
      type: "series",
      contentId: input.contentId,
      title: input.title,
      description: input.description,
      thumbnail: input.thumbnail,
      episodeId: input.episodeId,
      episodeNumber: input.episodeNumber,
      updatedAt: Date.now(),
    };
    await repository.save(entry);
  }

  async remove(type: "movie" | "series", contentId: string): Promise<void> {
    await repository.remove(type, contentId);
  }

  async clear(): Promise<void> {
    await repository.clear();
  }
}

// Singleton service instance
export const watchHistoryService = new WatchHistoryService();