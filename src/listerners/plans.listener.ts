import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
// import e from 'express';
import {
  NewTestEvent,
} from 'src/events/plans.events';

// eslint-disable-next-line @typescript-eslint/no-var-requires

@Injectable()
export class PlansListener {
  constructor(
    private eventEmitter: EventEmitter2,
  ) {}
  private readonly logger = new Logger(PlansListener.name);

  @OnEvent('test-event')
  async handleTestEvent(event: NewTestEvent) {
  this.logger.debug('Test Event', JSON.stringify(event));
  }
}

