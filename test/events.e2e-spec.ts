import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../NotificationEngineTrigger/app.module';

function CreateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

describe('EventsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    const eventObject = {
      input: {
        id: CreateUUID(),
        topic: 'evgt-system',
        eventType: 'System.BasicEvent',
        subject: '/',
        dataVersion: '1.0',
        eventTime: new Date(),
        data: {
          hello: 'world',
        },
      },
    };

    return request(app.getHttpServer())
      .post('/')
      .send(eventObject)
      .expect(201)
      .then((response) => {
        // Check the response type and length
        expect(Object.keys(response.body).length).toEqual(1);

        // Check the response data
        expect(response.body['input'].id).toBe(eventObject.input.id);
        expect(response.body['input'].topic).toBe(eventObject.input.topic);
        expect(response.body['input'].eventType).toBe(
          eventObject.input.eventType,
        );
        expect(response.body['input'].subject).toBe(eventObject.input.subject);
        expect(response.body['input'].dataVersion).toBe(
          eventObject.input.dataVersion,
        );
        expect(response.body['input'].eventTime).toBe(
          eventObject.input.eventTime.toISOString(),
        );
        expect(response.body['input'].data['hello']).toBe(
          eventObject.input.data.hello,
        );
      });
  });
});
