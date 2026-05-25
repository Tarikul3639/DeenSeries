import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Series } from "../../database/schemas/series.schema";
import { Movie } from "../../database/schemas/movie.schema";

import {
    FeaturedItemDto,
} from "./dto/home-response.dto";

@Injectable()
export class HomeService {
    constructor(
        @InjectModel(Series.name) private seriesModel: Model<Series>,
        @InjectModel(Movie.name) private movieModel: Model<Movie>
    ) { }

    async getFeatured(): Promise<FeaturedItemDto[]> {
        /* SERIES */
        const series = await this.seriesModel
            .find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(2)
            .lean();

        /* MOVIES */
        const movies = await this.movieModel
            .find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(2)
            .lean();

        /* MAP SERIES */
        const seriesItems = series.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            description: item.description,
            image: item.coverPoster || item.thumbnailPoster || "",
            type: "series" as const,
            slug: item.slug,
        }));

        /* MAP MOVIES */
        const movieItems = movies.map((item) => ({
            id: item._id.toString(),
            title: item.title,
            description: item.description,
            image: item.poster || "",
            type: "movie" as const,
            slug: item.slug,
        }));

        /* 🔥 MERGE + SHUFFLE */
        const merged = [...seriesItems, ...movieItems];

        return merged.sort(() => Math.random() - 0.5); // shuffle
    }
}