import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { UpdatePostDto } from 'src/posts/dto/update-post-dto';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData)
    }

    @Post('login')
    login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }

    @Put(':id')
    updateStaus(@Param('id') id: number, @Body() updateUserData: UpdateUserDto) {
        return this.authService.upDateUser(id, updateUserData)
    }

}
