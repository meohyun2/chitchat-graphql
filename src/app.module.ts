import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from './common/scalars/date.scalar';
import config from './config/config';
import { GraphqlConfig } from './config/config.interface';
import { AppController } from './controllers/app.controller';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          installSubscriptionHandlers: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ request }) => {
            return { request };
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
