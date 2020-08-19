import  { Sort } from '../sort/sort';
import  { Pageable } from '../pageable/pageable';
 
export class Page<T> {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;
 
  public constructor(content: Array<T>) {
    this.pageable = new Pageable();
    this.content = content;
    this.totalElements = content.length;
    this.numberOfElements = 10;
    this.size = 10;
    this.number = 0;
    this.totalPages = Math.round(this.totalElements/this.size);
  }
}