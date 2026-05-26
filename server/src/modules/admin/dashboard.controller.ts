import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service";
import { DashboardResponseDto } from "./dto/dashboard-response.dto";

@ApiTags("Admin Dashboard")
@Controller("admin/dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: "Get dashboard overview data" })
  getDashboard(): Promise<DashboardResponseDto> {
    return this.dashboardService.getDashboardData();
  }
}