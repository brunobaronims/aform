import { v4 } from 'uuid';

import { Command, CommandProps, Metadata } from '@/libs/interfaces';

export class CreateUserCommand implements Command {
  readonly id: string;

  readonly metadata: Metadata;

  readonly email: string;

  readonly handle: string;

  readonly password: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    this.id = props.id || v4();
    this.metadata = {
      causationId: props.metadata?.causationId,
      timestamp: props.metadata?.timestamp || Date.now(),
      userId: props.metadata?.userId
    };
    this.email = props.email;
    this.handle = props.handle;
    this.password = props.password;
  }
}
