import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { SeriesModule } from './modules/series/series.module';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { MoviesModule } from './modules/movies/movies.module';
import { HomeModule } from './modules/home/home.module';
import { DashboardModule } from "./modules/admin/dashboard.module";

// _-_-_-_ Auth _-_-_-
import { AuthModule } from './modules/auth/auth.module';

// _-_-_-_ Media _-_-_-
import { MediaModule } from './modules/media/media.module';

// _-_-_-_ Seed _-_-_-
import { SeedModule } from './seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env'],
      validationSchema: envValidationSchema,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 sec
          limit: 20,  // max 20 requests
        },
      ],
    }),

    DatabaseModule,
    SeriesModule,
    EpisodesModule,
    MoviesModule,
    AuthModule,
    MediaModule,
    SeedModule,
    HomeModule,
    DashboardModule,
  ],

  controllers: [],

  providers: [
    // Global rate limit guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}