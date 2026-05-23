import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

import type { StringValue } from "ms";
import ms from "ms";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const expires = config.get<StringValue>(
          "JWT_ACCESS_EXPIRES_IN",
          "15m"
        );

        return {
          secret: config.get<string>("JWT_ACCESS_SECRET")!,
          signOptions: {
            expiresIn: ms(expires),
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}