import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
      api_secret: this.config.get("CLOUDINARY_API_SECRET"),
    });
  }

  generateSignature() {
    const timestamp = Math.round(Date.now() / 1000);

    const params = {
      timestamp,
      folder: "deen-series", // cleaner naming
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      this.config.get<string>("CLOUDINARY_API_SECRET")!
    );

    return {
      ...params,
      signature,
      cloud_name: this.config.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.config.get("CLOUDINARY_API_KEY"),
    };
  }

  async deleteFile(publicId: string) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: "image", // or "video" if needed
    });
  }
}