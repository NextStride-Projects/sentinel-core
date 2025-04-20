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

export const getPagination = ({
  page = 1,
  limit = 10,
}: PaginationOptions): { skip: number; take: number } => {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
};

export const getOrder = <T extends string>({
  orderBy = 'createdAt' as T,
  order = 'desc',
}: OrderOptions<T>): { orderBy: Record<T, 'asc' | 'desc'> } => ({
  orderBy: { [orderBy]: order } as Record<T, 'asc' | 'desc'>,
});

export const getDateRangeFilter = (
  field: string,
  { from, to }: DateRange,
): Record<string, { gte?: Date; lte?: Date }> => {
  if (!from && !to) return {};

  const filter: { gte?: Date; lte?: Date } = {};
  if (from) filter.gte = new Date(from);
  if (to) filter.lte = new Date(to);

  return {
    [field]: filter,
  };
};

export const getSearchFilter = <T extends string>({
  search,
  fields = [],
}: SearchOptions<T>): {
  OR?: Record<T, { contains: string; mode: 'insensitive' }>[];
} => {
  if (!search || fields.length === 0) return {};

  return {
    OR: fields.map((field) => ({
      [field]: { contains: search, mode: 'insensitive' },
    })) as Record<T, { contains: string; mode: 'insensitive' }>[],
  };
};
