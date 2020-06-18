import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(autCredentialsDTO);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) autCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }>  {
        return this.authService.signIn(autCredentialsDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}
