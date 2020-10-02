import { Sort } from 'app/dto/page/sort.ts';

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
}
