import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  
  /* BASIC INFO */
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop()
  description?: string;

  @Prop()
  tagline?: string;

  /* MEDIA */
  @Prop()
  poster?: string;

  @Prop()
  thumbnail?: string;

  /* VIDEO */
  @Prop({ required: true })
  embed!: string;

  /* META */
  @Prop()
  duration!: string;

  @Prop()
  releaseDate?: string;

  @Prop({ type: [String], default: [] })
  genres?: string[];

  @Prop()
  rating?: string;

  @Prop({ default: "HD" })
  quality?: string;

  /* STATUS */
  @Prop({ default: true })
  isPublished?: boolean;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);

// Optional: Add indexes for efficient querying
MovieSchema.index({ title: "text", description: "text", tagline: "text" });

// Mongoose middleware to auto-generate slug from title before saving
MovieSchema.pre("save", function () {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
});