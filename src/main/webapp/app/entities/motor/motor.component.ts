import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMotor } from 'app/shared/model/motor.model';
import { AccountService } from 'app/core/auth/account.service';
import { MotorService } from './motor.service';

@Component({
  selector: 'jhi-motor',
  templateUrl: './motor.component.html'
})
export class MotorComponent implements OnInit, OnDestroy {
  motors: IMotor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected motorService: MotorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.motorService
      .query()
      .pipe(
        filter((res: HttpResponse<IMotor[]>) => res.ok),
        map((res: HttpResponse<IMotor[]>) => res.body)
      )
      .subscribe(
        (res: IMotor[]) => {
          this.motors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMotors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMotor) {
    return item.id;
  }

  registerChangeInMotors() {
    this.eventSubscriber = this.eventManager.subscribe('motorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
