import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    signUp(autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.singUp(autCredentialsDTO)
    }

    async signIn(autCredentialsDTO: AuthCredentialsDTO): Promise<any> {
        const username = await this.userRepository.validateUserPassword(autCredentialsDTO);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken }
    }
    
}
