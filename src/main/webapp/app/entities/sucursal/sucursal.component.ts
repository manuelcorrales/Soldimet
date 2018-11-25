import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { Principal } from 'app/core';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal',
    templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit, OnDestroy {
    sucursals: ISucursal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sucursalService: SucursalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sucursalService.query().subscribe(
            (res: HttpResponse<ISucursal[]>) => {
                this.sucursals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSucursals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISucursal) {
        return item.id;
    }

    registerChangeInSucursals() {
        this.eventSubscriber = this.eventManager.subscribe('sucursalListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
