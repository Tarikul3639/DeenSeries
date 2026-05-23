import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Series, SeriesSchema } from "../../database/schemas/series.schema";
import { SeriesService } from "./series.service";
import { SeriesController } from "./series.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
    ]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}