import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    signUp(autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.singUp(autCredentialsDTO)
    }

    async signIn(autCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const result = await this.userRepository.validateUserPassword(autCredentialsDTO);
        console.log(result);
    }
    
}
