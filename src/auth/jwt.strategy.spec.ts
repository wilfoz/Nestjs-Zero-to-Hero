import { Test } from "@nestjs/testing";
import { JwtStrategy } from "./jwt.strategy";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";

const mockUserRepository = () => ({
    findOne: jest.fn(),
});

describe('JwtStrategy', () => {
    let jwtStragegy: JwtStrategy;
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        jwtStragegy = await module.get<JwtStrategy>(JwtStrategy);
        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('validate', () => {
        it('validates and returns the user based on JWT payload', async () => {
            const user = new User();
            user.username = 'TestUser';

            userRepository.findOne.mockResolvedValue(user);
            const result = await jwtStragegy.validate({ username: 'TestUser' });
            expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'TestUser' })
        });

        it('throws an unauthorized exception as user cannot be found', () => {
            userRepository.findOne.mockResolvedValue(null);
            expect(jwtStragegy.validate({ username: 'TestUser' })).rejects.toThrow(UnauthorizedException);
        });
    });

})