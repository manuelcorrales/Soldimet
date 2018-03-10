import { ITEMS_PER_PAGE } from "../../shared/constants/pagination.constants";
export class Page {
    //The number of elements in the page
    size: number = ITEMS_PER_PAGE;
    //The total number of elements
    totalElements: number = 50;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    pageNumber: number = 1;
    //sorting
    sort: string;
    //filter
    filter: string[];
}
