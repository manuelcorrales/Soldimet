import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
export class Page {
    // The number of elements in the page
    size: number = ITEMS_PER_PAGE;
    // The total number of elements
    totalElements = 50;
    // The total number of pages
    totalPages = 0;
    // The current page number
    pageNumber = 1;
    // sorting
    sort: string;
    // filter
    filter: string[];
}
