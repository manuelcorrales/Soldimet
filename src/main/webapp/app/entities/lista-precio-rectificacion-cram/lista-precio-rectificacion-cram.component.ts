import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram',
    templateUrl: './lista-precio-rectificacion-cram.component.html'
})
export class ListaPrecioRectificacionCRAMComponent implements OnInit, OnDestroy {
listaPrecioRectificacionCRAMS: ListaPrecioRectificacionCRAM[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.listaPrecioRectificacionCRAMService.query().subscribe(
            (res: ResponseWrapper) => {
                this.listaPrecioRectificacionCRAMS = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInListaPrecioRectificacionCRAMS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ListaPrecioRectificacionCRAM) {
        return item.id;
    }
    registerChangeInListaPrecioRectificacionCRAMS() {
        this.eventSubscriber = this.eventManager.subscribe('listaPrecioRectificacionCRAMListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
