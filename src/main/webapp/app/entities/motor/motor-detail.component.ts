import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motor } from './motor.model';
import { MotorService } from './motor.service';

@Component({
    selector: 'jhi-motor-detail',
    templateUrl: './motor-detail.component.html'
})
export class MotorDetailComponent implements OnInit, OnDestroy {

    motor: Motor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motorService: MotorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotors();
    }

    load(id) {
        this.motorService.find(id).subscribe((motor) => {
            this.motor = motor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motorListModification',
            (response) => this.load(this.motor.id)
        );
    }
}
