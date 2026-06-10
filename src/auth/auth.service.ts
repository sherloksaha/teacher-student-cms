import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
// import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(userData: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await this.hashPassword(userData.password);
    userData.password = hashedPassword;
    const newUser = this.userRepository.create({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: userData.role, // Default to STUDENT if role is not provided
    });
    const savedUser = await this.userRepository.save(newUser);
    const { ...result } = savedUser;
    return {
      user: result,
      message: 'User registered successfully',
      status: 201,
    };
  }

  //   async login(userData: LoginDto) {
  //     const user = await this.userRepository.findOne({
  //       where: { email: userData.email },
  //     });
  //     if (!user) {
  //       throw new ConflictException('Invalid email or password');
  //     }
  //     const isPasswordValid = await bcrypt.compare(
  //       userData.password,
  //       user.password,
  //     );
  //     if (!isPasswordValid) {
  //       throw new ConflictException('Invalid email or password');
  //     }
  //     const { ...result } = user;
  //     return {
  //       user: result,
  //       message: 'Login successful',
  //       status: 200,
  //     };
  //   }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  // const user = this.userRepository.create(userData);
}
