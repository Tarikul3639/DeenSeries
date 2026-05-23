import { Controller, Get, Delete, Query } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";

@Controller("media")
export class MediaController {
  constructor(private cloudinary: CloudinaryService) {}

  /* 🔑 GET SIGNATURE */
  @Get("signature")
  getSignature() {
    return this.cloudinary.generateSignature();
  }

  /* ❌ DELETE FILE */
  @Delete()
  delete(@Query("public_id") publicId: string) {
    return this.cloudinary.deleteFile(publicId);
  }
}