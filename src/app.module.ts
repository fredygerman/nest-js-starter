import { Module, Logger } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as redis from 'redis';
import config from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { NestDrizzleModule } from './modules/drizzle/drizzle.module';
import * as schema from 'src/modules/drizzle/schema';

const {
  nodeEnv,
  databaseURL,
  redisHost,
  redisUser,
  redisPort,
  redisPassword,
  enableRedis,
} = config;

@Module({
  imports: [
    ...(enableRedis
      ? [
          CacheModule.registerAsync({
            useFactory: async () => {
              const options = {
                isGlobal: true,
                store: redisStore,
                host: nodeEnv === 'production' ? redisHost : 'localhost',
                port: nodeEnv === 'production' ? redisPort : '6379',
                username: nodeEnv === 'production' ? redisUser : undefined,
                password: nodeEnv === 'production' ? redisPassword : undefined,
                no_ready_check: nodeEnv === 'production' ? true : false,
              };

              try {
                // Attempt to create a Redis client to check the connection
                const redisClient = redis.createClient({
                  url: `redis://${options.username ? `${options.username}:${options.password}@` : ''}${options.host}:${options.port}`,
                });

                redisClient.on('error', (err) => {
                  throw err;
                }); 

                await redisClient.connect();
                await redisClient.quit();
              } catch (error) {
                Logger.error(`Failed to connect to Redis: ${error.message}`);
                throw new Error('Failed to connect to Redis');
              }

              return options;
            },
          }),
        ]
      : []),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: 'postgres-js',
          url: databaseURL,
          options: { schema },
          migrationOptions: {
            migrationsFolder: './src/modules/drizzle/migrations',
          },
        };
      },
    }),
  ],
})
export class AppModule {}