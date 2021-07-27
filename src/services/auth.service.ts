import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from 'src/config/config.interface';
import { Token } from 'src/models/token.model';
import { User } from 'src/models/User.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from 'src/resolvers/auth/dto/signup.input';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(input: SignUpInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );
    try {
      const user = await this.prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          nickname: input.nickname,
        },
      });
      return this.generateTokens({ email: user.email });
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(`일치하는 로그인 정보가 없습니다.`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(`비밀번호가 일치하지 않습니다.`);
    }

    return this.generateTokens({
      email: user.email,
    });
  }

  async getUserFromToken(token: string): Promise<User> {
    const email = this.jwtService.decode(token)['email'];
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async validateUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  generateTokens(payload: { email: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload: { email: string }): string {
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(payload: { email: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.expiresIn,
    });
  }

  refreshToken(token: string): Token {
    try {
      const { email } = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        email,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
