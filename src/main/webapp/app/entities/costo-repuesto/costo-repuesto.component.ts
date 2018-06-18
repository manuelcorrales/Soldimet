import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CostoRepuesto } from './costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-costo-repuesto',
    templateUrl: './costo-repuesto.component.html'
})
export class CostoRepuestoComponent implements OnInit, OnDestroy {
costoRepuestos: CostoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private costoRepuestoService: CostoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.costoRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.costoRepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCostoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostoRepuesto) {
        return item.id;
    }
    registerChangeInCostoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('costoRepuestoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
