import { Injectable } from '@nestjs/common';
import { Profile as PrismaProfile } from '@prisma/client';
import { Profile } from 'src/models/profile.model';
import { User } from 'src/models/User.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordInput } from 'src/resolvers/user/dto/changePassword.dto';
import { ConfigProfileInput } from 'src/resolvers/user/dto/configProfile.dto';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async createProfile(
    user: User,
    input: ConfigProfileInput,
  ): Promise<PrismaProfile> {
    try {
      const userProfile = await this.prisma.profile.create({
        data: {
          userId: user.id,
          statusMessage: input.statusMessage,
          photoUri: input.photoUri,
        },
      });
      return userProfile;
    } catch (error) {
      throw Error('프로필 생성 중 에러 발생');
    }
  }

  async getProfileById(input: Profile): Promise<Profile> {
    try {
      const userProfile = await this.prisma.profile.findUnique({
        where: {
          id: input.id,
        },
      });
      return userProfile;
    } catch (error) {
      throw new Error('프로필 불러오기 실패');
    }
  }

  async getProfileByUserId(user: User): Promise<Profile> {
    try {
      const userProfile = await this.prisma.user
        .findUnique({
          where: { id: user.id },
        })
        .profile();
      return userProfile;
    } catch (error) {
      throw new Error('내 프로필 불러오기 실패');
    }
  }

  async updateProfile(
    user: User,
    newProfile: ConfigProfileInput,
  ): Promise<Profile> {
    try {
      const currentProfile = await this.prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .profile();

      const updatedProfile = await this.prisma.profile.update({
        where: {
          id: currentProfile.id,
        },
        data: {
          statusMessage: newProfile.statusMessage,
          photoUri: newProfile.photoUri,
        },
      });
      return updatedProfile;
    } catch (error) {
      throw new Error('프로필 업데이트 실패');
    }
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new Error('비밀번호 변경 실패');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
