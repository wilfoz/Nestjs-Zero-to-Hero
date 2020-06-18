import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

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
}
