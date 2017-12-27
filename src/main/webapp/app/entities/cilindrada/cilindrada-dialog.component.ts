import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cilindrada } from './cilindrada.model';
import { CilindradaPopupService } from './cilindrada-popup.service';
import { CilindradaService } from './cilindrada.service';

@Component({
    selector: 'jhi-cilindrada-dialog',
    templateUrl: './cilindrada-dialog.component.html'
})
export class CilindradaDialogComponent implements OnInit {

    cilindrada: Cilindrada;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cilindradaService: CilindradaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cilindrada.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cilindradaService.update(this.cilindrada));
        } else {
            this.subscribeToSaveResponse(
                this.cilindradaService.create(this.cilindrada));
        }
    }

    private subscribeToSaveResponse(result: Observable<Cilindrada>) {
        result.subscribe((res: Cilindrada) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cilindrada) {
        this.eventManager.broadcast({ name: 'cilindradaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-cilindrada-popup',
    template: ''
})
export class CilindradaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cilindradaPopupService: CilindradaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cilindradaPopupService
                    .open(CilindradaDialogComponent as Component, params['id']);
            } else {
                this.cilindradaPopupService
                    .open(CilindradaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
