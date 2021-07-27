import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Profile } from './profile.model';

@ObjectType({ description: '유저 모델' })
export class User extends BaseModel {
  @Field()
  email?: string;

  @Field()
  nickname?: string;

  @HideField()
  @Field()
  password?: string;

  @Field()
  profile?: Profile;
}
