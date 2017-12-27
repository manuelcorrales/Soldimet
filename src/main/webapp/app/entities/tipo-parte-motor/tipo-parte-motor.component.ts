import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TipoParteMotor } from './tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tipo-parte-motor',
    templateUrl: './tipo-parte-motor.component.html'
})
export class TipoParteMotorComponent implements OnInit, OnDestroy {
tipoParteMotors: TipoParteMotor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoParteMotorService: TipoParteMotorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoParteMotorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoParteMotors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoParteMotors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoParteMotor) {
        return item.id;
    }
    registerChangeInTipoParteMotors() {
        this.eventSubscriber = this.eventManager.subscribe('tipoParteMotorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
