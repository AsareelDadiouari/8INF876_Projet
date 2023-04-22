import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import * as isDocker from 'is-docker';
//import isDocker from 'is-docker';
import entities from './index';
import { TicketsModule } from './tickets/tickets.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { isDocker } from './utils/utils';
ConfigModule.forRoot();

@Module({
  imports: [
    UsersModule,
    TicketsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: isDocker() ? process.env.DB_HOST : 'localhost',
      port: isDocker() ? parseInt(process.env.DB_PORT) : 3306,
      username: isDocker() ? process.env.DB_USER : 'user',
      password: isDocker() ? process.env.DB_PASSWORD : '',
      database: isDocker() ? process.env.DB_NAME : '8inf876-projet',
      entities,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
