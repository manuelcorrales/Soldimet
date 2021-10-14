import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'app/dto/page/page';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-base-filter-pageable',
  templateUrl: './base-filter-pageable.component.html',
})
export class BaseFilterPageableComponent<T> implements OnInit, OnDestroy {
  searchMethod: Function;
  page = 1;
  pageSize = 15;
  totalItems = 0;
  searchText;
  content: T[] = [];
  searchableService: any;
  debounceTime = 300;
  searchChanged: Subject<string> = new Subject<string>();
  searchChangeSubscription: Subscription;
  alertService: JhiAlertService;

  constructor() {}

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
      error => this.onError(error.message)
    );
  }

  onError(error) {
    this.alertService.error(error.message, null, null);
  }

  ngOnDestroy() {
    this.searchChangeSubscription.unsubscribe();
  }
}
