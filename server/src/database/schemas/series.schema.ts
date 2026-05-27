import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SeriesDocument = Series & Document;

@Schema({ timestamps: true })
export class Series {

    @Prop({ required: true })
    title!: string;

    @Prop({ unique: true })
    slug!: string;

    @Prop()
    description?: string;

    @Prop()
    tagline?: string;

    @Prop()
    coverPoster?: string;

    @Prop()
    rating?: number;

    @Prop()
    thumbnailPoster?: string;

    @Prop({ type: [String], default: [] })
    genres?: string[];

    @Prop()
    releaseDate?: string;

    @Prop({ default: true })
    isPublished!: boolean;

    @Prop({ default: 0 })
    totalEpisodes?: number;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);

// Optional: Add indexes for efficient querying
SeriesSchema.index({ title: "text", description: "text", tagline: "text" });

// Mongoose middleware to auto-generate slug from title before saving
SeriesSchema.pre("save", function () {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
});