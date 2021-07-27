import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType({ description: '유저 프로필 모델' })
export class Profile extends BaseModel {
  @Field({ nullable: true })
  statusMessage?: string;

  @Field({ nullable: true })
  photoUri?: string;
}
