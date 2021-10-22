import { Sort } from 'app/dto/page/sort';

export class Page<T> {
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;

  constructor(
    content: Array<T>,
    last: boolean,
    totalPages: number,
    totalElements: number,
    first: boolean,
    sort: Sort,
    numberOfElements: number,
    size: number,
    number: number
  ) {
    this.content = content;
    this.last = last;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.first = first;
    this.sort = sort;
    this.numberOfElements = numberOfElements;
    this.size = size;
    this.number = number;
  }
}
