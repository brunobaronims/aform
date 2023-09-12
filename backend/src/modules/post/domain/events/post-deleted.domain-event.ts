import { v4 } from 'uuid';

import { Exception } from '@/libs/exception';
import { Guard } from '@/libs/guard';
import { DomainEvent, Metadata, DomainEventProps } from '@/libs/interfaces';

export class PostDeletedDomainEvent implements DomainEvent {
    readonly id: string;
  
    readonly aggregateId: string;
  
    readonly metadata: Metadata;
  
    constructor(props: DomainEventProps<PostDeletedDomainEvent>) {
      if (Guard.isEmpty(props)) {
        throw new Exception(
          'DomainEvent props should not be empty',
          'GENERIC.ARGUMENT_NOT_PROVIDED'
        );
      }
      this.id = v4();
      this.aggregateId = props.aggregateId;
      this.metadata = {
        causationId: props?.metadata?.causationId,
        timestamp: props?.metadata?.timestamp || Date.now(),
        userId: props?.metadata?.userId
      };
    }
  }