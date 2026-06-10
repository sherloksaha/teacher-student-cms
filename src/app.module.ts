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
import { User } from './users/entities/user.entity';
import { Teacher } from './users/entities/teacher.entity';
import { Student } from './users/entities/student.entity';
import { StudentSubject } from './users/entities/student-subject.entity';
import { State } from './locations/entities/state.entity';
import { City } from './locations/entities/city.entity';
import { Area } from './locations/entities/area.entity';
import { Class } from './classes/entities/class.entity';
import { Subject } from './subjects/entities/subject.entity';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { SubscriptionHistory } from './subscriptions-history/entities/subscription-history.entity';
import { PostEntity } from './posts/entities/posts.entities';
import { AuthModule } from './auth/auth.module';

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
    //  TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // Pass your connection link directly here
    //   url: 'postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/mydatabase',
    //   entities: [],
    //   synchronize: true, // Automatically syncs database schema with your entity code
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '12345',
      database: process.env.DB_NAME || 'postgresproj1',
      entities: [
        User,
        Teacher,
        Student,
        StudentSubject,
        State,
        City,
        Area,
        Class,
        Subject,
        Subscription,
        SubscriptionHistory,
        PostEntity,
      ],
      synchronize: true, // Automatically syncs database schema with code (Disable in production!)
    }),
    LocationsModule,
    UsersModule,
    SubscriptionsModule,
    SubscriptionsHistoryModule,
    PaymentStatusModule,
    PostsModule,
    AuthModule,
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
