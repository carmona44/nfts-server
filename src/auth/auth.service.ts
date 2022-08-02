import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        // Test user 
        const user = { userId: '1', username: 'cryptoavatar', password: '1234' };

        if (user.username === username && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}