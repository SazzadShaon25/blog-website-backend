import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T>{
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>){
        this.modelQuery = modelQuery;
        this.query = query;
    };

    search(searchableFields: string []){
        const searchTerm = this?.query?.search;
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map
                ((field) =>({
                  [field]: {$regex: searchTerm, $options: 'i'}
                }) as FilterQuery<T>
                )
            });
        }
       return this; 
    }

    filter() {
        const queryObj = { ...this.query };
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
    sort(){
        const sortByField = this?.query?.sortBy ? this.query.sortBy as string : 'createdAt';
        const sortOrder = this?.query?.sortOrder === 'asc' ? '' : '-';
        const sort = `${sortOrder}${sortByField}`;
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
}

export default QueryBuilder;
