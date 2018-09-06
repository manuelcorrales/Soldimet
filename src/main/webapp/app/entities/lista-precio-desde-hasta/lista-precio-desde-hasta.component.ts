import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { Principal } from 'app/core';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';

@Component({
    selector: 'jhi-lista-precio-desde-hasta',
    templateUrl: './lista-precio-desde-hasta.component.html'
})
export class ListaPrecioDesdeHastaComponent implements OnInit, OnDestroy {
    listaPrecioDesdeHastas: IListaPrecioDesdeHasta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.listaPrecioDesdeHastaService.query().subscribe(
            (res: HttpResponse<IListaPrecioDesdeHasta[]>) => {
                this.listaPrecioDesdeHastas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInListaPrecioDesdeHastas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IListaPrecioDesdeHasta) {
        return item.id;
    }

    registerChangeInListaPrecioDesdeHastas() {
        this.eventSubscriber = this.eventManager.subscribe('listaPrecioDesdeHastaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
