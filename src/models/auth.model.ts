import { ObjectType } from '@nestjs/graphql';
import { User } from './User.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
