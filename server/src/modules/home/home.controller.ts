import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { HomeService } from "./home.service";
import { FeaturedItemDto } from "./dto/home-response.dto";

@ApiTags("Home")
@Controller("home")
export class HomeController {
    constructor(private readonly homeService: HomeService) { }

    /**
     * 🏠 Get Home Page Data
     */
    @Get("featured")
    @ApiOperation({
        summary: "Get home page data",
        description:
            "Returns featured banners, trending series, and latest movies for homepage",
    })
    @ApiResponse({
        status: 200,
        description: "Successfully fetched home data",
        type: [FeaturedItemDto],
    })
    @ApiResponse({
        status: 500,
        description: "Internal server error",
    })
    async getHome(): Promise<FeaturedItemDto[]> {
        return this.homeService.getFeatured();
    }
}