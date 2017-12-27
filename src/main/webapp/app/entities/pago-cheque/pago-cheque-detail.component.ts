import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PagoCheque } from './pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';

@Component({
    selector: 'jhi-pago-cheque-detail',
    templateUrl: './pago-cheque-detail.component.html'
})
export class PagoChequeDetailComponent implements OnInit, OnDestroy {

    pagoCheque: PagoCheque;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pagoChequeService: PagoChequeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPagoCheques();
    }

    load(id) {
        this.pagoChequeService.find(id).subscribe((pagoCheque) => {
            this.pagoCheque = pagoCheque;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPagoCheques() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pagoChequeListModification',
            (response) => this.load(this.pagoCheque.id)
        );
    }
}
