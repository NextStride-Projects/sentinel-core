"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchFilter = exports.getDateRangeFilter = exports.getOrder = exports.getPagination = void 0;
const getPagination = ({ page = 1, limit = 10, }) => {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
};
exports.getPagination = getPagination;
const getOrder = ({ orderBy = 'createdAt', order = 'desc', }) => ({
    orderBy: { [orderBy]: order },
});
exports.getOrder = getOrder;
const getDateRangeFilter = (field, { from, to }) => {
    if (!from && !to)
        return {};
    const filter = {};
    if (from)
        filter.gte = new Date(from);
    if (to)
        filter.lte = new Date(to);
    return {
        [field]: filter,
    };
};
exports.getDateRangeFilter = getDateRangeFilter;
const getSearchFilter = ({ search, fields = [], }) => {
    if (!search || fields.length === 0)
        return {};
    return {
        OR: fields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
        })),
    };
};
exports.getSearchFilter = getSearchFilter;
//# sourceMappingURL=query-helpers.js.map