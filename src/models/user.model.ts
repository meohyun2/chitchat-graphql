import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from './profile.model';

@ObjectType({ description: '유저 모델' })
export class User {
  @Field()
  id: string;

  @Field()
  nickname: string;

  @Field()
  password: string;

  @Field()
  profile: Profile;
}
