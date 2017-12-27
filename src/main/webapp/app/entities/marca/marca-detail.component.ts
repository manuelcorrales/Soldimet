import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Marca } from './marca.model';
import { MarcaService } from './marca.service';

@Component({
    selector: 'jhi-marca-detail',
    templateUrl: './marca-detail.component.html'
})
export class MarcaDetailComponent implements OnInit, OnDestroy {

    marca: Marca;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private marcaService: MarcaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMarcas();
    }

    load(id) {
        this.marcaService.find(id).subscribe((marca) => {
            this.marca = marca;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMarcas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'marcaListModification',
            (response) => this.load(this.marca.id)
        );
    }
}
