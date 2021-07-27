import { UseGuards } from '@nestjs/common';
import { Mutation, Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/decorators/user.decorator';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { Profile } from 'src/models/profile.model';
import { User } from 'src/models/User.model';
import { UserService } from 'src/services/user.service';

import { ConfigProfileInput } from './dto/configProfile.dto';
import { CurrentProfileInput } from './dto/CurrentProfileInput.dto';

@Resolver((of) => Profile)
@UseGuards(GqlAuthGuard)
export class UserResovler {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async me(@UserEntity() user: User) {
    return user;
  }

  @Query((returns) => Profile)
  async getProfile(@UserEntity() user: User) {
    return await this.userService.getProfileByUserId(user);
  }

  @Mutation((returns) => Profile)
  async createProfile(
    @Args('input') input: ConfigProfileInput,
    @UserEntity() user: User,
  ) {
    console.log(user);
    return await this.userService.createProfile(user, input);
  }

  @Mutation((returns) => Profile)
  async updateProfile(
    @Args('newProfile') newProfile: ConfigProfileInput,
    @UserEntity() user: User,
  ) {
    return await this.userService.updateProfile(user, newProfile);
  }
}
