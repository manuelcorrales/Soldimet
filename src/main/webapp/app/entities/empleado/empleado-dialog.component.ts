import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoPopupService } from './empleado-popup.service';
import { EmpleadoService } from './empleado.service';
import { Persona, PersonaService } from '../persona';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-empleado-dialog',
    templateUrl: './empleado-dialog.component.html'
})
export class EmpleadoDialogComponent implements OnInit {
    empleado: Empleado;
    isSaving: boolean;

    personas: Persona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private empleadoService: EmpleadoService,
        private personaService: PersonaService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.personaService.query({ filter: 'empleado-is-null' }).subscribe(
            (res: ResponseWrapper) => {
                if (!this.empleado.persona || !this.empleado.persona.id) {
                    this.personas = res.json;
                } else {
                    this.personaService.find(this.empleado.persona.id).subscribe(
                        (subRes: Persona) => {
                            this.personas = [subRes].concat(res.json);
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
        if (this.empleado.id !== undefined) {
            this.subscribeToSaveResponse(this.empleadoService.update(this.empleado));
        } else {
            this.subscribeToSaveResponse(this.empleadoService.create(this.empleado));
        }
    }

    private subscribeToSaveResponse(result: Observable<Empleado>) {
        result.subscribe((res: Empleado) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Empleado) {
        this.eventManager.broadcast({ name: 'empleadoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonaById(index: number, item: Persona) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-empleado-popup',
    template: ''
})
export class EmpleadoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private empleadoPopupService: EmpleadoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.empleadoPopupService.open(EmpleadoDialogComponent as Component, params['id']);
            } else {
                this.empleadoPopupService.open(EmpleadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
