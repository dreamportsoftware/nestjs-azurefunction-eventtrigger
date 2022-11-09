class GenericEvent {
  id!: string;
  topic!: string;
  eventType!: string;
  subject!: string;
  dataVersion!: string;
  eventTime!: string;
  data: any;
}

export class CreateEventDto {
  input!: GenericEvent;
}
