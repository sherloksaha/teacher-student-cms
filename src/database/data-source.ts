import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Teacher } from '../users/entities/teacher.entity';
import { Student } from '../users/entities/student.entity';
import { StudentSubject } from '../users/entities/student-subject.entity';
import { State } from '../locations/entities/state.entity';
import { City } from '../locations/entities/city.entity';
import { Area } from '../locations/entities/area.entity';
import { Class } from '../classes/entities/class.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionHistory } from '../subscriptions-history/entities/subscription-history.entity';
import { PostEntity } from '../posts/entities/posts.entities';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
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
  synchronize: false,
});
