import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    singUp(@Body(ValidationPipe) autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(autCredentialsDTO);
    }
}
