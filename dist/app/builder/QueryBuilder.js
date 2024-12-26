"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    ;
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }))
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ['search', 'sortBy', 'sortOrder'];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (this.query.filter) {
            const authorId = this.query.filter;
            queryObj.author = authorId;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    // sorting
    sort() {
        var _a, _b;
        const sortByField = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) ? this.query.sortBy : 'createdAt';
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === 'asc' ? '' : '-';
        const sort = `${sortOrder}${sortByField}`;
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
}
exports.default = QueryBuilder;
