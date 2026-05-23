import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import type { StringValue } from "ms";
import ms from "ms";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  /* 🔥 CLEAN GETTERS */
  private get accessTokenSecret(): string {
    return this.config.get<string>("JWT_ACCESS_SECRET")!;
  }

  private get refreshTokenSecret(): string {
    return this.config.get<string>("JWT_REFRESH_SECRET")!;
  }

  private get jwtAccessTokenExpiresIn(): StringValue {
    return this.config.get<StringValue>("JWT_ACCESS_EXPIRES_IN", "15m");
  }

  private get jwtRefreshTokenExpiresIn(): StringValue {
    return this.config.get<StringValue>("JWT_REFRESH_EXPIRES_IN", "7d");
  }

  /* 🔐 LOGIN */
  async login(password: string) {
    const hashed = this.config.get<string>("ADMIN_PASSWORD_HASH")!;
    const isMatch = await bcrypt.compare(password, hashed);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { role: "admin" };

    /* 🔥 ACCESS TOKEN */
    const accessToken = this.jwt.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: ms(this.jwtAccessTokenExpiresIn),
    });

    /* 🔥 REFRESH TOKEN */
    const refreshToken = this.jwt.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: ms(this.jwtRefreshTokenExpiresIn),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /* 🔄 REFRESH TOKEN */
  async refresh(token: string) {
    try {
      const payload = this.jwt.verify(token, {
        secret: this.refreshTokenSecret,
      });

      const newAccessToken = this.jwt.sign(
        { role: payload.role },
        {
          secret: this.accessTokenSecret,
          expiresIn: ms(this.jwtAccessTokenExpiresIn),
        }
      );

      return {
        access_token: newAccessToken,
      };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}