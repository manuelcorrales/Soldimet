import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PagoCheque } from './pago-cheque.model';
import { PagoChequePopupService } from './pago-cheque-popup.service';
import { PagoChequeService } from './pago-cheque.service';
import { Banco, BancoService } from '../banco';
import { FormaDePago, FormaDePagoService } from '../forma-de-pago';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pago-cheque-dialog',
    templateUrl: './pago-cheque-dialog.component.html'
})
export class PagoChequeDialogComponent implements OnInit {
    pagoCheque: PagoCheque;
    isSaving: boolean;

    bancos: Banco[];

    formadepagos: FormaDePago[];
    fechaCobroDp: any;
    fechaReciboDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pagoChequeService: PagoChequeService,
        private bancoService: BancoService,
        private formaDePagoService: FormaDePagoService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.bancoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bancos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.formaDePagoService.query({ filter: 'pagocheque-is-null' }).subscribe(
            (res: ResponseWrapper) => {
                if (!this.pagoCheque.formaDePago || !this.pagoCheque.formaDePago.id) {
                    this.formadepagos = res.json;
                } else {
                    this.formaDePagoService.find(this.pagoCheque.formaDePago.id).subscribe(
                        (subRes: FormaDePago) => {
                            this.formadepagos = [subRes].concat(res.json);
                        },
                        (subRes: ResponseWrapper) => this.onError(subRes.json)
                    );
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pagoCheque.id !== undefined) {
            this.subscribeToSaveResponse(this.pagoChequeService.update(this.pagoCheque));
        } else {
            this.subscribeToSaveResponse(this.pagoChequeService.create(this.pagoCheque));
        }
    }

    private subscribeToSaveResponse(result: Observable<PagoCheque>) {
        result.subscribe((res: PagoCheque) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PagoCheque) {
        this.eventManager.broadcast({ name: 'pagoChequeListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBancoById(index: number, item: Banco) {
        return item.id;
    }

    trackFormaDePagoById(index: number, item: FormaDePago) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pago-cheque-popup',
    template: ''
})
export class PagoChequePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private pagoChequePopupService: PagoChequePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.pagoChequePopupService.open(PagoChequeDialogComponent as Component, params['id']);
            } else {
                this.pagoChequePopupService.open(PagoChequeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
