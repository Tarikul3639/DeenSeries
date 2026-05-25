import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode {

  /* RELATION */
  @Prop({ type: Types.ObjectId, ref: "Series", required: true })
  series!: Types.ObjectId;

  @Prop({ required: true })
  slug!: string;

  /* BASIC INFO */
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  /* EPISODE NUMBER */
  @Prop({ required: true })
  episodeNumber!: number;

  /* VIDEO */
  @Prop({ required: true })
  embed!: string;

  /* OPTIONAL */
  @Prop()
  thumbnail?: string;

  /* ⭐ EXTRA */
  @Prop()
  duration?: string;

  @Prop({ default: "HD" })
  quality?: string;

  @Prop()
  rating?: number;

  @Prop()
  releaseDate?: string;

  /* STATUS */
  @Prop({ default: true })
  isPublished!: boolean;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);

// Optional: Add indexes for efficient querying
EpisodeSchema.index({ title: "text", description: "text" });
EpisodeSchema.index({ series: 1, episodeNumber: 1 }, { unique: true });

// Mongoose middleware to auto-generate slug from title before saving
EpisodeSchema.pre("save", function () {
  if (this.isModified("title") || this.isModified("episodeNumber")) {
    this.slug = `${this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")}-ep-${this.episodeNumber}`;
  }
});