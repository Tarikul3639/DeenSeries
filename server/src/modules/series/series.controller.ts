import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";
import { SeriesService } from "./series.service";
import { GetSeriesQueryDto } from "./dto/get-series-query.dto";

@Controller("series")
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  /* ➕ CREATE */
  @Post()
  create(@Body() body: any) {
    return this.seriesService.create(body);
  }

  /* 📄 GET ALL */
  @Get()
  findAll(@Query() query: GetSeriesQueryDto) {
    // DEBUG: Log the received query parameters
    const { page = 1, limit = 10, search = '' } = query;
    console.log("Backend Received -> Page:", page, "Limit:", limit, "Search:", search);
    return this.seriesService.findAll(
      query.page ?? 1,
      query.limit ?? 10,
      query.search ?? '',
    );
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