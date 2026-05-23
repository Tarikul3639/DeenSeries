import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {}

  generateSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "deenseries",
      },
      this.config.get<string>("CLOUDINARY_API_SECRET")! 
    );

    return {
      timestamp,
      signature,
      cloud_name: this.config.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      folder: "deenseries",
    };
  }

  async deleteFile(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}