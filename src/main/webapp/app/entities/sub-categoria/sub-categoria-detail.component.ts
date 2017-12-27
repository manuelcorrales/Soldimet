import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SubCategoria } from './sub-categoria.model';
import { SubCategoriaService } from './sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria-detail',
    templateUrl: './sub-categoria-detail.component.html'
})
export class SubCategoriaDetailComponent implements OnInit, OnDestroy {

    subCategoria: SubCategoria;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subCategoriaService: SubCategoriaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubCategorias();
    }

    load(id) {
        this.subCategoriaService.find(id).subscribe((subCategoria) => {
            this.subCategoria = subCategoria;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubCategorias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subCategoriaListModification',
            (response) => this.load(this.subCategoria.id)
        );
    }
}
