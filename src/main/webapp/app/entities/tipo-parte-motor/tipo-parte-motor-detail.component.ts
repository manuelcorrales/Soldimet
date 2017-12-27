import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParteMotor } from './tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Component({
    selector: 'jhi-tipo-parte-motor-detail',
    templateUrl: './tipo-parte-motor-detail.component.html'
})
export class TipoParteMotorDetailComponent implements OnInit, OnDestroy {

    tipoParteMotor: TipoParteMotor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoParteMotorService: TipoParteMotorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoParteMotors();
    }

    load(id) {
        this.tipoParteMotorService.find(id).subscribe((tipoParteMotor) => {
            this.tipoParteMotor = tipoParteMotor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoParteMotors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoParteMotorListModification',
            (response) => this.load(this.tipoParteMotor.id)
        );
    }
}
