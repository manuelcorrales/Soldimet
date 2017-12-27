import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Articulo } from './articulo.model';
import { ArticuloService } from './articulo.service';

@Component({
    selector: 'jhi-articulo-detail',
    templateUrl: './articulo-detail.component.html'
})
export class ArticuloDetailComponent implements OnInit, OnDestroy {

    articulo: Articulo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private articuloService: ArticuloService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArticulos();
    }

    load(id) {
        this.articuloService.find(id).subscribe((articulo) => {
            this.articulo = articulo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArticulos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'articuloListModification',
            (response) => this.load(this.articulo.id)
        );
    }
}
