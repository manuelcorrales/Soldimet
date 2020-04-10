import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-parte-motor',
  templateUrl: './tipo-parte-motor.component.html'
})
export class TipoParteMotorComponent implements OnInit, OnDestroy {
  tipoParteMotors: ITipoParteMotor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoParteMotorService: TipoParteMotorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoParteMotorService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoParteMotor[]>) => res.ok),
        map((res: HttpResponse<ITipoParteMotor[]>) => res.body)
      )
      .subscribe(
        (res: ITipoParteMotor[]) => {
          this.tipoParteMotors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoParteMotors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoParteMotor) {
    return item.id;
  }

  registerChangeInTipoParteMotors() {
    this.eventSubscriber = this.eventManager.subscribe('tipoParteMotorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
