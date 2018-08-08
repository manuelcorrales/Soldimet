import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { Principal } from 'app/core';
import { TipoRepuestoService } from './tipo-repuesto.service';

@Component({
    selector: 'jhi-tipo-repuesto',
    templateUrl: './tipo-repuesto.component.html'
})
export class TipoRepuestoComponent implements OnInit, OnDestroy {
    tipoRepuestos: ITipoRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoRepuestoService: TipoRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoRepuestoService.query().subscribe(
            (res: HttpResponse<ITipoRepuesto[]>) => {
                this.tipoRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoRepuesto) {
        return item.id;
    }

    registerChangeInTipoRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
