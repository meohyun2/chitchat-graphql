import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const userContext = GqlExecutionContext.create(ctx).getContext().req.user;
    console.log(userContext);
    return userContext;
  },
);
