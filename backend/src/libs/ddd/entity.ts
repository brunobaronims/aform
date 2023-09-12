import { Exception } from '../exception';
import { Guard } from '../guard';

export interface EntityAttributes {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewEntity<T> {
    id: string;
    additionalAttributes: T;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Entity<AdditionalAttributes> {
    constructor({
        id,
        additionalAttributes,
        createdAt
    }: NewEntity<AdditionalAttributes>) {
        this._id = id;
        this.validateAdditionalAttributes(additionalAttributes);
        const now = new Date();
        this._createdAt = createdAt || now;
        this._updatedAt = createdAt || now;
        this.additionalAttributes = additionalAttributes;
    }

    private readonly additionalAttributes: AdditionalAttributes;

    private _id: string;

    private readonly _createdAt: Date;

    private _updatedAt: Date;

    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    static isEntity(entity: unknown): entity is Entity<unknown> {
        return entity instanceof Entity;
    }

    /**
   *  Checks if two entities are the same Entity by comparing ID field.
   * @param object Entity
   */
    public equals(object?: Entity<AdditionalAttributes>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!Entity.isEntity(object)) {
            return false;
        }

        return this.id ? this.id === object.id : false;
    }

    /**
   * Returns entity attributes.
   * @return {*}  {Attributes}
   * @memberof Entity
   */
    public getAttributes(): EntityAttributes & AdditionalAttributes {
        const attributesCopy = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...this.additionalAttributes
        };
        return Object.freeze(attributesCopy);
    }

    private validateAdditionalAttributes(additionalAttributes: AdditionalAttributes): void {
        const MAX_ATTRIBUTES = 50;

        if (Guard.isEmpty(additionalAttributes)) {
            throw new Exception(
                'Entity additional attributes should not be empty',
                'GENERIC.ARGUMENT_NOT_PROVIDED'
            );
        }
        if (typeof additionalAttributes !== 'object') {
            throw new Exception(
                'Entity additional attributes should be an object',
                'GENERIC.ARGUMENT_INVALID'
            );
        }
        if (Object.keys(additionalAttributes as any).length > MAX_ATTRIBUTES) {
            throw new Exception(
                'Entity additional attributes should be an object',
                'GENERIC.ARGUMENT_OUT_OF_RANGE'
            );
        }
    }
}