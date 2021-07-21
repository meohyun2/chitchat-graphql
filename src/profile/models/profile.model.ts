import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '유저 프로필 모델' })
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  statusMessage?: string;

  @Field({ nullable: true })
  imageUri?: string;
}
