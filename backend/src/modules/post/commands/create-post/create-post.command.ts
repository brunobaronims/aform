import { v4 } from 'uuid';

import { Command, CommandProps, Metadata } from '@/libs/interfaces';

export class CreatePostCommand implements Command {
  readonly id: string;

  readonly metadata: Metadata;

  readonly handle: string;

  readonly description: string;

  readonly userId: string;

  constructor(props: CommandProps<CreatePostCommand>) {
    this.id = props.id || v4();
    this.metadata = {
      causationId: props.metadata?.causationId,
      timestamp: props.metadata?.timestamp || Date.now(),
      userId: props.userId
    };
    this.userId = props.userId;
    this.handle = props.handle;
    this.description = props.description;
  }
}
