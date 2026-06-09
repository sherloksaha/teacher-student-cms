import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentStatusService } from './payment-status/payment-status.service';
import { PaymentStatusController } from './payment-status/payment-status.controller';
import { SubscriptionsHistoryModule } from './subscriptions-history/subscriptions-history.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { LocationsService } from './locations/locations.service';
import { LocationsController } from './locations/locations.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //  TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // Pass your connection link directly here
    //   url: 'postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/mydatabase',
    //   entities: [],
    //   synchronize: true, // Automatically syncs database schema with your entity code
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1', // Localhost IP
      port: 5432, // Default Postgres port
      username: 'postgres', // Your Postgres username
      password: '12345', // The password you set during installation
      database: 'postgres', // The database name you see in DBeaver
      entities: [], // We will add your entities here later
      synchronize: true, // Automatically syncs database schema with code (Disable in production!)
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // validationSchema:joi.object({
      //   APP_NAME: joi.string().default('My_App')
      // })
      load: [appConfig],
    }),
    LocationsModule,
    UsersModule,
    SubscriptionsModule,
    SubscriptionsHistoryModule,
    PaymentStatusModule,
    PostsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    LocationsController,
    PaymentStatusController,
  ],
  providers: [AppService, UsersService, LocationsService, PaymentStatusService],
})
export class AppModule {}
