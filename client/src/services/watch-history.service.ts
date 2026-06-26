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
}

export interface SaveSeriesInput {
  contentId: string;
  title: string;
  thumbnail?: string;
  episodeId: string;
  episodeNumber: number;
}

class WatchHistoryService {
  async getLatest(): Promise<WatchHistoryEntry | null> {
    const all = await repository.getAll();
    if (all.length === 0) return null;
    // Sort by updatedAt descending, return latest
    return all.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }

  async saveMovie(input: SaveMovieInput): Promise<void> {
    const entry: WatchHistoryEntry = {
      type: "movie",
      contentId: input.contentId,
      title: input.title,
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
      thumbnail: input.thumbnail,
      episodeId: input.episodeId,
      episodeNumber: input.episodeNumber,
      updatedAt: Date.now(),
    };
    await repository.save(entry);
  }

  async remove(contentId: string): Promise<void> {
    await repository.remove(contentId);
  }

  async clear(): Promise<void> {
    await repository.clear();
  }
}

// Singleton service instance
export const watchHistoryService = new WatchHistoryService();
