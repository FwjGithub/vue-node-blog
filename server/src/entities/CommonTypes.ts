export interface ISearchResult<T> {
    count: number;
    data: T[];
    errors: string[];
}
