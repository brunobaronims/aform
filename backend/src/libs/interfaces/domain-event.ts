import { Metadata } from './metadata';

export type DomainEventProps<T> = Omit<T, 'id' | ' metadata'> & {
    aggregateId: string;
    metadata?: Metadata;
};

export interface DomainEvent {
    readonly id: string;

    readonly aggregateId: string;

    readonly metadata: Metadata;
};