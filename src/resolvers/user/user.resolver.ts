import { Mutation, Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';

import { User } from '../../models/user.model';
import { SignUpInput } from './dto/signup.input';

@Resolver((of) => User)
export class UserResovler {
  constructor() {}

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => String }) id: string) {
    // find user by id service 필요
    return {};
  }

  @Mutation((returns) => User)
  async createUser(@Args('input') input: SignUpInput) {
    // have to use service writing record in Prisma DB 필요
    return {};
  }
}
