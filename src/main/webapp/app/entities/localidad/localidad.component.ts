import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocalidad } from 'app/shared/model/localidad.model';
import { Principal } from 'app/core';
import { LocalidadService } from 'app/entities/localidad/localidad.service';

@Component({
    selector: 'jhi-localidad',
    templateUrl: './localidad.component.html'
})
export class LocalidadComponent implements OnInit, OnDestroy {
    localidads: ILocalidad[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private localidadService: LocalidadService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.localidadService.query().subscribe(
            (res: HttpResponse<ILocalidad[]>) => {
                this.localidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocalidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocalidad) {
        return item.id;
    }

    registerChangeInLocalidads() {
        this.eventSubscriber = this.eventManager.subscribe('localidadListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
