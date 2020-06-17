import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/singup')
    singUp(@Body() autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(autCredentialsDTO);
    }
}
