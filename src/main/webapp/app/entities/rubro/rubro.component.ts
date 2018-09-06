import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRubro } from 'app/shared/model/rubro.model';
import { Principal } from 'app/core';
import { RubroService } from 'app/entities/rubro/rubro.service';

@Component({
    selector: 'jhi-rubro',
    templateUrl: './rubro.component.html'
})
export class RubroComponent implements OnInit, OnDestroy {
    rubros: IRubro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rubroService: RubroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.rubroService.query().subscribe(
            (res: HttpResponse<IRubro[]>) => {
                this.rubros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRubros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRubro) {
        return item.id;
    }

    registerChangeInRubros() {
        this.eventSubscriber = this.eventManager.subscribe('rubroListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
