import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import type { JwtPayload } from "./strategies/jwt.strategy";
import type { StringValue } from "ms";
import ms from "ms";

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  /* CLEAN GETTERS */
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

  /* LOGIN */
  async login(password: string) {
    const hashed = this.config.get<string>("ADMIN_PASSWORD_HASH")!;
    const isMatch = await bcrypt.compare(password, hashed);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload: JwtPayload = { role: "admin" };

    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
    };
  }

  /* REFRESH TOKEN */
  async refresh(refreshToken: string) {
    try {
      const payload: JwtPayload = this.jwt.verify(refreshToken, {
        secret: this.refreshTokenSecret,
      });

      return {
        access_token: this.generateAccessToken(payload),
      };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  /* TOKEN HELPERS */
  private generateAccessToken(payload: JwtPayload) {
    return this.jwt.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: ms(this.jwtAccessTokenExpiresIn),
    });
  }

  private generateRefreshToken(payload: JwtPayload) {
    return this.jwt.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: ms(this.jwtRefreshTokenExpiresIn),
    });
  }
}