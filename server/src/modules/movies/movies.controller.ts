import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /* ➕ CREATE */
  @Post()
  create(@Body() body: any) {
    return this.moviesService.create(body);
  }

  /* 📄 GET ALL */
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  /* 🔍 GET ONE */
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.moviesService.findOne(slug);
  }

  /* ✏️ UPDATE */
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.moviesService.update(id, body);
  }

  /* ❌ DELETE */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
}