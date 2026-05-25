import { ApiProperty } from "@nestjs/swagger";

/* FEATURED ITEM */
export class FeaturedItemDto {
  @ApiProperty({
    example: "665f1a2b3c4d5e6f7a8b9c0d",
    description: "Unique ID of the item",
  })
  id!: string;

  @ApiProperty({
    example: "Omar Series",
    description: "Title of the series or movie",
  })
  title!: string;

  @ApiProperty({
    example: "Islamic historical drama",
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: "https://cdn.example.com/poster.jpg",
    description: "Cover image URL",
  })
  image!: string;

  @ApiProperty({
    example: "series",
    enum: ["series", "movie"],
  })
  type!: "series" | "movie";

  @ApiProperty({
    example: "omar-series",
    description: "SEO friendly slug",
  })
  slug!: string;
}