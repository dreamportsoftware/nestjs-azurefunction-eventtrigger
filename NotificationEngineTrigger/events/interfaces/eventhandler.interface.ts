import { CreateEventDto } from '../dto/create-event.dto';

export interface EventHandlerInterface {
  handle(event: CreateEventDto): CreateEventDto;
}
