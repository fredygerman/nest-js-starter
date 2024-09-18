import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'; //new
import { NewTestEvent } from './events/plans.events';
@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('In AppService');
    // this.eventEmitter.emit('new-test', new NewTestEvent('test message')); //new
    return 'Hello World!';
  }

  @OnEvent('new-test')
  async handleNewTestEvent(event: NewTestEvent) {
    this.logger.log('New Test Event', JSON.stringify(event));
  }
}
