import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from './profile.model';

@ObjectType({ description: '유저 모델' })
export class Users {
  @Field()
  email?: string;

  @Field()
  nickname?: string;

  @Field()
  password?: string;

  @Field()
  profile?: Profile;
}
