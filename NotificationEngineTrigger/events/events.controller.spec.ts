import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';

describe('EventsController', () => {
  let controller: EventsController;
  const postBody: CreateEventDto = {
    input: {
      id: '831e1650-001e-001b-66ab-eeb76e069631',
      topic: 'evgt-system',
      eventType: 'System_BasicEvent',
      subject: '/',
      dataVersion: 'v1.0',
      eventTime: new Date().toISOString(),
      data: {
        hello: 'World',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.triggerEvent(postBody)).toBe('Hello World!');
    });
  });
});
