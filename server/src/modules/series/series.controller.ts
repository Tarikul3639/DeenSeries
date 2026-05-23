import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { SeriesService } from "./series.service";

@Controller("series")
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  /* ➕ CREATE */
  @Post()
  create(@Body() body: any) {
    return this.seriesService.create(body);
  }

  /* 📄 GET ALL */
  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  /* 🔍 GET ONE */
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.seriesService.findOne(slug);
  }

  /* ✏️ UPDATE */
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.seriesService.update(id, body);
  }

  /* ❌ DELETE */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seriesService.remove(id);
  }
}