import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { Principal } from 'app/core';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram',
    templateUrl: './lista-precio-rectificacion-cram.component.html'
})
export class ListaPrecioRectificacionCRAMComponent implements OnInit, OnDestroy {
    listaPrecioRectificacionCRAMS: IListaPrecioRectificacionCRAM[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.listaPrecioRectificacionCRAMService.query().subscribe(
            (res: HttpResponse<IListaPrecioRectificacionCRAM[]>) => {
                this.listaPrecioRectificacionCRAMS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInListaPrecioRectificacionCRAMS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IListaPrecioRectificacionCRAM) {
        return item.id;
    }

    registerChangeInListaPrecioRectificacionCRAMS() {
        this.eventSubscriber = this.eventManager.subscribe('listaPrecioRectificacionCRAMListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
