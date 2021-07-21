import { Field, ObjectType } from '@nestjs/graphql';
import {} from './';

@ObjectType({ description: '유저 모델' })
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field()
  password?: string;

  @Field()
  profile?: Profile[]
}
