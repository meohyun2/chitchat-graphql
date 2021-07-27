import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordService } from 'src/services/password.service';
import { UserService } from 'src/services/user.service';
import { UserResovler } from './user.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UserResovler, UserService, PasswordService],
})
export class UserModule {}
