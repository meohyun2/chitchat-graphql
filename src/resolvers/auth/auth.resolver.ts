import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Auth } from 'src/models/auth.model';
import { Token } from 'src/models/token.model';
import { AuthService } from 'src/services/auth.service';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((returns) => Auth)
  async signUp(@Args('input') input: SignUpInput) {
    const { accessToken, refreshToken } = await this.auth.createUser(input);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation((returns) => Auth)
  async login(@Args('input') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email,
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation((returns) => Token)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', (of) => Auth)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
