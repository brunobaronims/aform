import { EventEmitter2 } from '@nestjs/event-emitter';

import { AggregateRoot, DomainEvent } from '@/libs/interfaces';
import { Entity, EntityAttributes, NewEntity } from '@/libs/ddd';
import { UserCreatedDomainEvent, UserDeletedDomainEvent } from './events';
import { UserAttributes } from './user.interfaces';
import { LoggerPort } from '@/libs/ports/logger.port';

export class UserEntity implements AggregateRoot {
  constructor({
    id: id,
    additionalAttributes: attributes
  }: NewEntity<UserAttributes>) {
    this.entity = new Entity<UserAttributes>({
      id: id,
      additionalAttributes: attributes
    });
  }

  private entity: Entity<UserAttributes>;

  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  get id(): string {
    return this.entity.id;
  }

  static create(
    id: string,
    additionalAttributes: UserAttributes,
    createdAt: Date
  ): UserEntity {
    const user = new UserEntity({
      id,
      additionalAttributes,
      createdAt
    });
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        email: additionalAttributes.email,
        metadata: {
          timestamp: Date.now()
        }
      })
    );
    return user;
  }

  private addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  private clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(
    logger: LoggerPort,
    eventEmitter: EventEmitter2,
    entityId: string
  ): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `"${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${entityId}`
        );
        return eventEmitter.emitAsync(event.constructor.name, event);
      })
    );
    this.clearEvents();
  }

  getAttributes(): EntityAttributes & UserAttributes {
    return this.entity.getAttributes();
  }

  delete(): void {
    this.addEvent(
      new UserDeletedDomainEvent({
        aggregateId: this.entity.id,
        metadata: {
          timestamp: Date.now()
        }
      })
    );
  }
}
