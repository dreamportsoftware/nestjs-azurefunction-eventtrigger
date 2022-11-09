import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Header, Post } from '@nestjs/common';

@Controller()
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @Header('content-type', 'application/json')
  triggerEvent(@Body() eventGridEvent: CreateEventDto): CreateEventDto {
    console.log('============================================');
    console.log('RUN CONTROLLER');
    console.log(this.eventsService, typeof this.eventsService);
    console.log('============================================');
    return this.eventsService.processEvent(eventGridEvent);
  }

  /**
   * Handles entrypoint from index.ts file as triggered by the Azure function
   * by routing to the standard post controller above
   * @param eventGridEvent The event JSON object
   * @returns {CreateEventDto} A copy of the input that was sent
   */
  functionTrigger(eventGridEvent: CreateEventDto): CreateEventDto {
    return this.triggerEvent(eventGridEvent);
  }
}
