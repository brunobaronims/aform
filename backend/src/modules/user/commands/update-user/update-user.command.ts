import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';

import { Command, CommandProps, Metadata } from '@/libs/interfaces';

export class UpdateUserCommand implements Command {
  readonly id: string;

  readonly metadata: Metadata;

  readonly userId: string;

  readonly data: Prisma.UserUpdateInput;

  constructor(props: CommandProps<UpdateUserCommand>) {
    this.id = props.id || v4();
    this.metadata = {
      causationId: props.metadata?.causationId,
      timestamp: props.metadata?.timestamp || Date.now(),
      userId: props.userId
    };
    this.userId = props.userId;
    this.data = props.data;
  }
}
