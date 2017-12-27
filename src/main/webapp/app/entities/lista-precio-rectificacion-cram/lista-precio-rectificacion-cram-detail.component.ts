import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-detail',
    templateUrl: './lista-precio-rectificacion-cram-detail.component.html'
})
export class ListaPrecioRectificacionCRAMDetailComponent implements OnInit, OnDestroy {

    listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInListaPrecioRectificacionCRAMS();
    }

    load(id) {
        this.listaPrecioRectificacionCRAMService.find(id).subscribe((listaPrecioRectificacionCRAM) => {
            this.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInListaPrecioRectificacionCRAMS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'listaPrecioRectificacionCRAMListModification',
            (response) => this.load(this.listaPrecioRectificacionCRAM.id)
        );
    }
}
