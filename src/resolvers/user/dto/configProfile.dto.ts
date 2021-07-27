import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ConfigProfileInput {
  @Field()
  statusMessage: string;

  @Field()
  photoUri: string;
}
