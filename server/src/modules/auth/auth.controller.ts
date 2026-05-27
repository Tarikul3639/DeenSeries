import { Controller, Post, Body, Res } from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.auth.login(body.password);

    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: false, // production → true
      sameSite: "lax",
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return { success: true };
  }

  @Post("refresh")
  async refresh(@Body() body: { refresh_token: string }, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.refresh(body.refresh_token);

    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return { success: true };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    console.log("Logging out...");
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { success: true };
  }
}