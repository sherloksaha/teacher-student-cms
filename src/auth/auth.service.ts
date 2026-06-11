import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';
// import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

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
    const { password,...result } = savedUser;
    return {
      user: result,
      message: 'User registered successfully',
      status: 201,
    };
  }

  async login(userData: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (!user) {
      throw new ConflictException('Invalid email or password');
    }
    if (!await this.verifyPassword(userData?.password, user?.password)) {
      throw new UnauthorizedException('Password does not match')
    }
    const tokens = this.generateToken(user);
    const { password, ...rest } = user;

    return {
      user: rest,
      accessTokn: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: 'Login successful',
      status: 200,
    };
  }

  private generateToken(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    }
  }

  async refreshToken(refreshToken:string ){
    try{
      const payload = this.jwtService.verify(refreshToken, {
        secret:  process.env.JWT_SERVICE_SECRET,
      })
      const user = await this.userRepository.findOne({
        where: {
          id: payload.sub
        }
      })
      if(!user){
        throw new UnauthorizedException('No user found , check your token again!')
      }
      const accessToken = this.generateAccessToken(user);
      return {
        messsge: 'Access Token created..',
        status: 200,
        accessToken
      }
    }catch(e){
      throw new UnauthorizedException('Invalid token!')
    }
  }
  async findCurrentUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return { data: result, status: 200 , message:"Current User Found"};
  }

  async upDateUser(id: number, updateUser: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUser.firstName) {
      user.firstName = updateUser.firstName;
    }
    if (updateUser.lastName) {
      user.lastName = updateUser.lastName;
    }
    if (updateUser.password) {
      user.password = await this.hashPassword(updateUser.password);
    }
    if (updateUser.status !== undefined) {
      user.isActive = updateUser.status;
    }

    const updatedUser = await this.userRepository.save(user);
    const { password, ...result } = updatedUser;
    return result;
  }
  private async verifyPassword(pass1, pass2): Promise<boolean> {
    return bcrypt.compare(pass1, pass2);
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private generateAccessToken(user: User): string {
    const payload = {
      email: user?.email,
      sub: user?.id,
      role: user?.role
    }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SERVICE_SECRET,
      expiresIn: '15m'
    })
  }
  private generateRefreshToken(user: User): string {
    const payload = {

      sub: user?.id,

    }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SERVICE_SECRET,
      expiresIn: '7d'
    })
  }
}
