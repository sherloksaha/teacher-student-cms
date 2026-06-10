import { Module, Post } from '@nestjs/common';
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
      password: 'password', // The password you set during installation
      database: 'postgresproj1', // The database name you see in DBeaver
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
        PostEntity
      ],
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
