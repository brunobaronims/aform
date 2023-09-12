import { v4 } from 'uuid';

import { Exception } from '@/libs/exception';
import { Guard } from '@/libs/guard';
import { DomainEvent, Metadata, DomainEventProps } from '@/libs/interfaces';

export class PostCreatedDomainEvent implements DomainEvent {
    readonly handle: string;
  
    readonly id: string;
  
    readonly aggregateId: string;
  
    readonly metadata: Metadata;
  
    constructor(props: DomainEventProps<PostCreatedDomainEvent>) {
      if (Guard.isEmpty(props)) {
        throw new Exception(
          'DomainEvent props should not be empty',
          'GENERIC.ARGUMENT_NOT_PROVIDED'
        );
      }
      this.id = v4();
      this.handle = props.handle;
      this.aggregateId = props.aggregateId;
      this.metadata = {
        causationId: props?.metadata?.causationId,
        timestamp: props?.metadata?.timestamp || Date.now(),
        userId: props?.metadata?.userId
      };
    }
  }