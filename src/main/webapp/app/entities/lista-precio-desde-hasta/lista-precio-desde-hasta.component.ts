import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-lista-precio-desde-hasta',
    templateUrl: './lista-precio-desde-hasta.component.html'
})
export class ListaPrecioDesdeHastaComponent implements OnInit, OnDestroy {
listaPrecioDesdeHastas: ListaPrecioDesdeHasta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.listaPrecioDesdeHastaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.listaPrecioDesdeHastas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInListaPrecioDesdeHastas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ListaPrecioDesdeHasta) {
        return item.id;
    }
    registerChangeInListaPrecioDesdeHastas() {
        this.eventSubscriber = this.eventManager.subscribe('listaPrecioDesdeHastaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
