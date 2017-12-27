import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoService } from './empleado.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-empleado',
    templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit, OnDestroy {
empleados: Empleado[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private empleadoService: EmpleadoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.empleadoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.empleados = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmpleados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Empleado) {
        return item.id;
    }
    registerChangeInEmpleados() {
        this.eventSubscriber = this.eventManager.subscribe('empleadoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
