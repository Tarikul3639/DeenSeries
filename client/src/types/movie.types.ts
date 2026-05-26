export interface MovieCardProps {
    movieId: string | number;
    title: string;
    posterUrl: string;
    duration: string;
    genres: string[];
    year: string | number;
    rating?: number;
    description?: string;
}