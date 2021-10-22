import { AlertService } from 'app/core/util/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'app/dto/page/page';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-base-filter-pageable',
  templateUrl: './base-filter-pageable.component.html',
})
export class BaseFilterPageableComponent<T> implements OnInit, OnDestroy {
  page = 1;
  pageSize = 15;
  totalItems = 0;
  searchText: string | undefined;
  content: T[] = [];
  searchableService: any;
  debounceTime = 300;
  searchChanged: Subject<string> = new Subject<string>();
  searchChangeSubscription: Subscription | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(protected alertService: AlertService) {}

  ngOnInit() {
    this.requestContent();
    this.searchChangeSubscription = this.searchChanged.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe(newText => {
      this.searchText = newText;
      this.page = 1;
      this.requestContent();
    });
  }

  public requestContent() {
    this.searchableService.findByFilteredPage(this.searchText, this.page - 1, this.pageSize).subscribe(
      (response: Page<T>) => {
        this.totalItems = response.totalElements;
        this.content = response.content;
      },
      (error: HttpErrorResponse) => this.onError(error)
    );
  }

  onError(error: HttpErrorResponse) {
    this.alertService.addAlert({ message: error.message, type: 'danger' });
  }

  ngOnDestroy() {
    this.searchChangeSubscription?.unsubscribe();
  }
}
