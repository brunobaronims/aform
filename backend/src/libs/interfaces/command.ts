import { Metadata } from './metadata';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

export interface Command {
    readonly id: string;

    readonly metadata: Metadata;
}