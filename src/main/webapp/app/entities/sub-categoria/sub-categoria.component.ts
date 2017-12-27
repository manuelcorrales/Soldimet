import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { SubCategoria } from './sub-categoria.model';
import { SubCategoriaService } from './sub-categoria.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-sub-categoria',
    templateUrl: './sub-categoria.component.html'
})
export class SubCategoriaComponent implements OnInit, OnDestroy {
subCategorias: SubCategoria[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subCategoriaService: SubCategoriaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subCategoriaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.subCategorias = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubCategorias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubCategoria) {
        return item.id;
    }
    registerChangeInSubCategorias() {
        this.eventSubscriber = this.eventManager.subscribe('subCategoriaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
