import { EventsController } from './events/events.controller';
import { NestFactory } from '@nestjs/core';
import { AzureFunction, Context } from '@azure/functions';

import { FunctionLogger } from './utils/FunctionLogger';

import { AppModule } from './app.module';

const eventGridTrigger: AzureFunction = async function (
  context: Context,
  eventGridEvent: any,
): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new FunctionLogger(context),
  });
  const handler = app.get<EventsController>(EventsController);
  const response = handler.functionTrigger(eventGridEvent);
  context.log.info('Response: ', response);

  // EventGridTrigger can't return different status codes and messages, defaults to 202 accepted
  // @see https://github.com/Azure/azure-functions-python-worker/issues/874
};

export default eventGridTrigger;
