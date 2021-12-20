import {SortProp} from "./sortProp";

export interface RequestBody {
    searchFirstname: string;
    searchLastname: string;
    searchEmail: string;
    sortProps: SortProp[];
    pageNo: number;
    perPage: number;
}