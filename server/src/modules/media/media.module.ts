import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { CloudinaryService } from "./cloudinary.service";

@Module({
  controllers: [MediaController],
  providers: [CloudinaryService],
})
export class MediaModule {}