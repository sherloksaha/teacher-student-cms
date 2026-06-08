import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
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
import * as joi from 'joi';
import appConfig from './config/app.config';

@Module({
  imports: [
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
    PaymentStatusModule, PostsModule
  ],
  controllers: [
    AppController, 
    UsersController, 
    LocationsController, 
    PaymentStatusController
  ],
  providers: [AppService, UsersService, LocationsService, PaymentStatusService],
})
export class AppModule { }
