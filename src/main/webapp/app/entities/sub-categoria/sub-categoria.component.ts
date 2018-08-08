import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { Principal } from 'app/core';
import { SubCategoriaService } from './sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria',
    templateUrl: './sub-categoria.component.html'
})
export class SubCategoriaComponent implements OnInit, OnDestroy {
    subCategorias: ISubCategoria[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subCategoriaService: SubCategoriaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.subCategoriaService.query().subscribe(
            (res: HttpResponse<ISubCategoria[]>) => {
                this.subCategorias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubCategorias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubCategoria) {
        return item.id;
    }

    registerChangeInSubCategorias() {
        this.eventSubscriber = this.eventManager.subscribe('subCategoriaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
