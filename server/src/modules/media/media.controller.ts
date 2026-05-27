import { Controller, Get, Delete, Query, BadRequestException, UseGuards } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("media")
export class MediaController {
  constructor(private cloudinary: CloudinaryService) { }

  /* GET SIGNATURE */
  @Get("signature")
  @UseGuards(JwtAuthGuard)
  getSignature() {
    return this.cloudinary.generateSignature();
  }

  /* DELETE FILE */
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Query("publicId") publicId: string) {
    if (!publicId) {
      throw new BadRequestException("publicId is required");
    }

    return this.cloudinary.deleteFile(publicId);
  }
}