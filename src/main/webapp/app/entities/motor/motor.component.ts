import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMotor } from 'app/shared/model/motor.model';
import { Principal } from 'app/core';
import { MotorService } from 'app/entities/motor/motor.service';

@Component({
    selector: 'jhi-motor',
    templateUrl: './motor.component.html'
})
export class MotorComponent implements OnInit, OnDestroy {
    motors: IMotor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private motorService: MotorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.motorService.query().subscribe(
            (res: HttpResponse<IMotor[]>) => {
                this.motors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
