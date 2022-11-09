import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventHandlerInterface } from '../interfaces/eventhandler.interface';

@Injectable()
export class SystemBasicEventService implements EventHandlerInterface {
  private readonly logger = new Logger(HSFSystemBasicEventService.name);

  handle(event: CreateEventDto) {
    // event
    this.logger.log(event);

    return event;
  }
}
