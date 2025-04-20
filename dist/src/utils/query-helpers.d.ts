export type PaginationOptions = {
    page?: number;
    limit?: number;
};
export type OrderOptions<T extends string = 'createdAt'> = {
    orderBy?: T;
    order?: 'asc' | 'desc';
};
export type DateRange = {
    from?: string;
    to?: string;
};
export type SearchOptions<T extends string = string> = {
    search?: string;
    fields?: T[];
};
export declare const getPagination: ({ page, limit, }: PaginationOptions) => {
    skip: number;
    take: number;
};
export declare const getOrder: <T extends string>({ orderBy, order, }: OrderOptions<T>) => {
    orderBy: Record<T, "asc" | "desc">;
};
export declare const getDateRangeFilter: (field: string, { from, to }: DateRange) => Record<string, {
    gte?: Date;
    lte?: Date;
}>;
export declare const getSearchFilter: <T extends string>({ search, fields, }: SearchOptions<T>) => {
    OR?: Record<T, {
        contains: string;
        mode: "insensitive";
    }>[];
};
