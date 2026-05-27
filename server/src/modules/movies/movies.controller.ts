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
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { GetMoviesQueryDto } from "./dto/get-movies-query.dto";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  /* CREATE */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  /* GET ALL — Pagination + Search */
  @Get()
  findAll(@Query() query: GetMoviesQueryDto) {
    // DEBUG: Log the received query parameters
    // const { page = 1, limit = 10, search = '' } = query;
    // console.log("Backend Received -> Page:", page, "Limit:", limit, "Search:", search);
    return this.moviesService.findAll(
      query.page ?? 1,
      query.limit ?? 10,
      query.search ?? "",
    );
  }

  /* GET BY ID OR SLUG */
  @Get(":movieIdOrSlug")
  findOne(@Param("movieIdOrSlug") movieIdOrSlug: string) {
    return this.moviesService.findOne(movieIdOrSlug);
  }

  /* UPDATE */
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(id, body);
  }

  /* DELETE */
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
}