/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CurrentUser } from './current-user.decorator';

describe('CurrentUser Decorator', () => {
  it('should be defined', () => {
    expect(CurrentUser).toBeDefined();
  });

  it('should create decorator with correct metadata', () => {
    class TestController {
      test(@CurrentUser() user: any) {
        return user;
      }
    }

    const metadata = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      TestController,
      'test',
    );
    expect(metadata).toBeDefined();
  });

  it('should create decorator with data parameter', () => {
    class TestController {
      test(@CurrentUser('id') userId: string) {
        return userId;
      }
    }

    const metadata = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      TestController,
      'test',
    );
    expect(metadata).toBeDefined();
  });
});
