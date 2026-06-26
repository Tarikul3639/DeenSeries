"use client";

import { useEffect, useRef } from "react";
import { watchHistoryService } from "@/services/watch-history.service";

/**
 * Hook to save movie to watch history after ~4s delay.
 * Only saves once per mount unless contentId changes.
 */
export function useSaveMovieWatchHistory(
  contentId: string,
  title: string,
  thumbnail?: string,
  shouldSave: boolean = true
) {
  const savedRef = useRef(false);

  useEffect(() => {
    if (!shouldSave || !contentId || savedRef.current) return;

    const timer = setTimeout(() => {
      watchHistoryService.saveMovie({ contentId, title, thumbnail });
      savedRef.current = true;
    }, 4000);

    return () => clearTimeout(timer);
  }, [contentId, title, thumbnail, shouldSave]);
}

/**
 * Hook to save series episode to watch history after ~4s delay.
 * Updates the record if the series already exists (new episode overwrites old).
 */
export function useSaveSeriesWatchHistory(
  contentId: string,
  title: string,
  thumbnail: string | undefined,
  episodeId: string,
  episodeNumber: number,
  shouldSave: boolean = true
) {
  const savedRef = useRef(false);

  useEffect(() => {
    if (!shouldSave || !contentId || !episodeId || savedRef.current) return;

    const timer = setTimeout(() => {
      watchHistoryService.saveSeries({
        contentId,
        title,
        thumbnail,
        episodeId,
        episodeNumber,
      });
      savedRef.current = true;
    }, 4000);

    return () => clearTimeout(timer);
  }, [contentId, title, thumbnail, episodeId, episodeNumber, shouldSave]);
}
