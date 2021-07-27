import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field((type) => ID)
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
