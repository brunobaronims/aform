import { DomainEvent } from './domain-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerPort } from '../ports/logger.port';

export interface AggregateRoot {
    readonly domainEvents: DomainEvent[];

    publishEvents(
        logger: LoggerPort,
        eventEmitter: EventEmitter2,
        entityId: string
    ): Promise<void>;
};