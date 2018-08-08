import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { Principal } from 'app/core';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
    selector: 'jhi-precio-repuesto',
    templateUrl: './precio-repuesto.component.html'
})
export class PrecioRepuestoComponent implements OnInit, OnDestroy {
    precioRepuestos: IPrecioRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private precioRepuestoService: PrecioRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.precioRepuestoService.query().subscribe(
            (res: HttpResponse<IPrecioRepuesto[]>) => {
                this.precioRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrecioRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrecioRepuesto) {
        return item.id;
    }

    registerChangeInPrecioRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('precioRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
