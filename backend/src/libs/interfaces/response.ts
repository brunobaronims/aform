export interface Response {
    readonly id: string;
};

export interface ApiResponse extends Response {
    readonly createdAt: Date | null;

    readonly updatedAt: Date | null;
};

export interface PaginatedResponse<T> {
    readonly count?: number;

    readonly limit?: number;

    readonly page?: number;

    readonly data: readonly T[];
};