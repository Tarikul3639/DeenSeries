import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

import { ApiOperation, ApiResponse, ApiTags, } from "@nestjs/swagger";
 
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Login successful" })
  login(@Body() body: LoginDto) {
    return this.auth.login(body.password);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "Token refreshed successfully" })
  refresh(@Body() body: RefreshDto) {
    return this.auth.refresh(body.refresh_token);
  }
}