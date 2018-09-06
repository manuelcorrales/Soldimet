import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { Principal } from 'app/core';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

@Component({
    selector: 'jhi-aplicacion',
    templateUrl: './aplicacion.component.html'
})
export class AplicacionComponent implements OnInit, OnDestroy {
    aplicacions: IAplicacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aplicacionService: AplicacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.aplicacionService.query().subscribe(
            (res: HttpResponse<IAplicacion[]>) => {
                this.aplicacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAplicacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAplicacion) {
        return item.id;
    }

    registerChangeInAplicacions() {
        this.eventSubscriber = this.eventManager.subscribe('aplicacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
