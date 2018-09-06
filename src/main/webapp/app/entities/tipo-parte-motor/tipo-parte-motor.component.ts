import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { Principal } from 'app/core';
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
        private tipoParteMotorService: TipoParteMotorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoParteMotorService.query().subscribe(
            (res: HttpResponse<ITipoParteMotor[]>) => {
                this.tipoParteMotors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
