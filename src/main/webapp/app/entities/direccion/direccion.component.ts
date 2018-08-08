import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDireccion } from 'app/shared/model/direccion.model';
import { Principal } from 'app/core';
import { DireccionService } from './direccion.service';

@Component({
    selector: 'jhi-direccion',
    templateUrl: './direccion.component.html'
})
export class DireccionComponent implements OnInit, OnDestroy {
    direccions: IDireccion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private direccionService: DireccionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.direccionService.query().subscribe(
            (res: HttpResponse<IDireccion[]>) => {
                this.direccions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDireccions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDireccion) {
        return item.id;
    }

    registerChangeInDireccions() {
        this.eventSubscriber = this.eventManager.subscribe('direccionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
