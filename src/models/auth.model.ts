import { ObjectType } from '@nestjs/graphql';
import { Users } from './users.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: Users;
}
