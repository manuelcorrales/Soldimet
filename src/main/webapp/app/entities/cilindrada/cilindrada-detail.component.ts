import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Cilindrada } from './cilindrada.model';
import { CilindradaService } from './cilindrada.service';

@Component({
    selector: 'jhi-cilindrada-detail',
    templateUrl: './cilindrada-detail.component.html'
})
export class CilindradaDetailComponent implements OnInit, OnDestroy {

    cilindrada: Cilindrada;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cilindradaService: CilindradaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCilindradas();
    }

    load(id) {
        this.cilindradaService.find(id).subscribe((cilindrada) => {
            this.cilindrada = cilindrada;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCilindradas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cilindradaListModification',
            (response) => this.load(this.cilindrada.id)
        );
    }
}
