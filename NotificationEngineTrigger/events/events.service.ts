import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventHandlerInterface } from './interfaces/eventhandler.interface';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @Inject('EVENT_PROCESSOR') private eventProcessor: EventHandlerInterface,
  ) {}

  processEvent(eventGridEvent: any): CreateEventDto {
    this.logger.log('Running Event Service');

    this.logger.log(this.eventProcessor);
    this.logger.log(typeof this.eventProcessor);

    return this.eventProcessor.handle(eventGridEvent);
  }
}
