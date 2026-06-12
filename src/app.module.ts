import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PaymentStatusModule } from './modules/payment-status/payment-status.module';
import { PaymentStatusService } from './modules/payment-status/payment-status.service';
import { PaymentStatusController } from './modules/payment-status/payment-status.controller';
import { SubscriptionsHistoryModule } from './modules/subscriptions-history/subscriptions-history.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Teacher } from './modules/users/entities/teacher.entity';
import { Student } from './modules/users/entities/student.entity';
import { StudentSubject } from './modules/users/entities/student-subject.entity';
import { State } from './modules/locations/entities/state.entity';
import { City } from './modules/locations/entities/city.entity';
import { Area } from './modules/locations/entities/area.entity';
import { Class } from './modules/classes/entities/class.entity';
import { Subject } from './modules/subjects/entities/subject.entity';
import { Subscription } from './modules/subscriptions/entities/subscription.entity';
import { SubscriptionHistory } from './modules/subscriptions-history/entities/subscription-history.entity';
import { PostEntity } from './modules/posts/entities/posts.entities';
import { AuthModule } from './modules/auth/auth.module';
import { ClassesModule } from './modules/classes/classes.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { StudentSubjectsModule } from './modules/student-subjects/student-subjects.module';

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
    ClassesModule,
    SubjectsModule,
    StudentSubjectsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    PaymentStatusController,
  ],
  providers: [AppService, UsersService, PaymentStatusService],
})
export class AppModule {}
