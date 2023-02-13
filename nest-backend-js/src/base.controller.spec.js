import { Test } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

describe('AppController', () => {
  let app;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [BaseService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(BaseController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
