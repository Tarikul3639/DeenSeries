import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from "@nestjs/common";

import type {
  Request,
  Response,
} from "express";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  /* LOGIN */
  @Post("login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.auth.login(body.password);

    /* ACCESS TOKEN COOKIE */
    res.cookie("access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15, // 15 minutes
      path: "/",
    });

    /* REFRESH TOKEN COOKIE */
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
    };
  }

  /* REFRESH ACCESS TOKEN */
  @Post("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;

    const result = await this.auth.refresh(refreshToken);

    /* NEW ACCESS TOKEN */
    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15, // 15 minutes
      path: "/",
    });

    return {
      success: true,
      message: "Token refreshed",
    };
  }

  /* LOGOUT */
  @Post("logout")
  logout(
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie("access_token", {
      path: "/",
    });

    res.clearCookie("refresh_token", {
      path: "/",
    });

    return {
      success: true,
      message: "Logout successful",
    };
  }
}