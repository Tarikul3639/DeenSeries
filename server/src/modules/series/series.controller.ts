import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SeriesService } from "./series.service";
import { GetSeriesQueryDto } from "./dto/get-series-query.dto";
import { CreateSeriesDto } from "./dto/create-series.dto";
import { UpdateSeriesDto } from "./dto/update-series.dto";

@Controller("series")
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  /* CREATE */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateSeriesDto) {
    return this.seriesService.create(body);
  }

  /* GET ALL */
  @Get()
  findAll(@Query() query: GetSeriesQueryDto) {
    // DEBUG: Log the received query parameters
    // const { page = 1, limit = 10, search = '' } = query;
    // console.log("Backend Received -> Page:", page, "Limit:", limit, "Search:", search);
    return this.seriesService.findAll(query);
  }

  /* GET ONE */
  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.seriesService.findOne(slug);
  }

  /* UPDATE */
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: UpdateSeriesDto) {
    return this.seriesService.update(id, body);
  }

  /* DELETE */
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.seriesService.remove(id);
  }
}