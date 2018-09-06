import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMarca } from 'app/shared/model/marca.model';
import { Principal } from 'app/core';
import { MarcaService } from 'app/entities/marca/marca.service';

@Component({
    selector: 'jhi-marca',
    templateUrl: './marca.component.html'
})
export class MarcaComponent implements OnInit, OnDestroy {
    marcas: IMarca[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private marcaService: MarcaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.marcaService.query().subscribe(
            (res: HttpResponse<IMarca[]>) => {
                this.marcas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMarcas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMarca) {
        return item.id;
    }

    registerChangeInMarcas() {
        this.eventSubscriber = this.eventManager.subscribe('marcaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
