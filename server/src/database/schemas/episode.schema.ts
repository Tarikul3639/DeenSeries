import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode {
  
  /* RELATION */
  @Prop({ type: Types.ObjectId, ref: "Series", required: true })
  series!: Types.ObjectId;

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