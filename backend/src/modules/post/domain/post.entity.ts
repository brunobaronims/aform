import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 } from 'uuid';

import { AggregateRoot, DomainEvent } from '@/libs/interfaces';
import { Entity, EntityAttributes, NewEntity } from '@/libs/ddd';
import { PostCreatedDomainEvent, PostDeletedDomainEvent } from './events';
import { PostAttributes } from '@/modules/post/domain/post.interfaces';
import { LoggerPort } from '@/libs/ports/logger.port';

export class PostEntity implements AggregateRoot {
  constructor({
    id: id,
    additionalAttributes: attributes
  }: NewEntity<PostAttributes>) {
    this.entity = new Entity<PostAttributes>({
      id: id,
      additionalAttributes: attributes
    });
  }

  private entity: Entity<PostAttributes>;

  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  get id(): string {
    return this.entity.id;
  }

  static create(additionalAttributes: PostAttributes): PostEntity {
    const id = v4();
    const user = new PostEntity({ id, additionalAttributes });
    user.addEvent(
      new PostCreatedDomainEvent({
        aggregateId: id,
        handle: additionalAttributes.handle,
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

  getAttributes(): EntityAttributes & PostAttributes {
    return this.entity.getAttributes();
  }

  delete(): void {
    this.addEvent(
      new PostDeletedDomainEvent({
        aggregateId: this.entity.id,
        metadata: {
          timestamp: Date.now()
        }
      })
    );
  }
}
