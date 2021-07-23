import { jwtConstants } from 'src/constant/jwtKey';
import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Chitchat Graphql Server',
    description: 'Chitchat API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  JWT_REFRESH_SECRET: jwtConstants.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: jwtConstants.JWT_ACCESS_SECRET,
};

export default (): Config => config;
