import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';

@Component({
    selector: 'jhi-lista-precio-desde-hasta-detail',
    templateUrl: './lista-precio-desde-hasta-detail.component.html'
})
export class ListaPrecioDesdeHastaDetailComponent implements OnInit, OnDestroy {

    listaPrecioDesdeHasta: ListaPrecioDesdeHasta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInListaPrecioDesdeHastas();
    }

    load(id) {
        this.listaPrecioDesdeHastaService.find(id).subscribe((listaPrecioDesdeHasta) => {
            this.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInListaPrecioDesdeHastas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'listaPrecioDesdeHastaListModification',
            (response) => this.load(this.listaPrecioDesdeHasta.id)
        );
    }
}
