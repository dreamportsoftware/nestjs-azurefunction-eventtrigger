import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
//import { EventHandlerInterface } from './interfaces/eventhandler.interface';
import { SystemBasicEventService } from './services/system_basicevent.service';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: 'EVENT_PROCESSOR',
      // useClass: SystemBasicEventService,
      useFactory: (req: any): EventHandlerInterface => {
        console.log('RUN FACTORY', req);
        return new SystemBasicEventService();
      },
    },
  ],
})
export class EventsModule {}
