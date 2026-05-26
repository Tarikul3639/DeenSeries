import { ApiProperty } from "@nestjs/swagger";

/* STATS */
export class DashboardStatsDto {
  @ApiProperty()
  totalMovies!: number;

  @ApiProperty()
  totalSeries!: number;

  @ApiProperty()
  totalEpisodes!: number;
}

/* ITEM */
export class DashboardItemDto {
  @ApiProperty()
  _id!: string;

  @ApiProperty()
  title!: string;
}

/* MAIN RESPONSE */
export class DashboardResponseDto {
  @ApiProperty({ type: DashboardStatsDto })
  stats!: DashboardStatsDto;

  @ApiProperty({ type: [DashboardItemDto] })
  recentSeries?: DashboardItemDto[];

  @ApiProperty({ type: [DashboardItemDto] })
  recentMovies?: DashboardItemDto[];
}