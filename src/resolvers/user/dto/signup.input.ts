import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @MinLength(8)
  id: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(14)
  nickname: string;
}
