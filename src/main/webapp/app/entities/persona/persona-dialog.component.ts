import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Persona } from './persona.model';
import { PersonaPopupService } from './persona-popup.service';
import { PersonaService } from './persona.service';
import { Direccion, DireccionService } from '../direccion';
import { EstadoPersona, EstadoPersonaService } from '../estado-persona';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-persona-dialog',
    templateUrl: './persona-dialog.component.html'
})
export class PersonaDialogComponent implements OnInit {
    persona: Persona;
    isSaving: boolean;

    direccions: Direccion[];

    estadopersonas: EstadoPersona[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personaService: PersonaService,
        private direccionService: DireccionService,
        private estadoPersonaService: EstadoPersonaService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.direccionService.query({ filter: 'persona-is-null' }).subscribe(
            (res: ResponseWrapper) => {
                if (!this.persona.direccion || !this.persona.direccion.id) {
                    this.direccions = res.json;
                } else {
                    this.direccionService.find(this.persona.direccion.id).subscribe(
                        (subRes: Direccion) => {
                            this.direccions = [subRes].concat(res.json);
                        },
                        (subRes: ResponseWrapper) => this.onError(subRes.json)
                    );
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.estadoPersonaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadopersonas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.userService.query().subscribe(
            (res: ResponseWrapper) => {
                this.users = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<Persona>) {
        result.subscribe((res: Persona) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Persona) {
        this.eventManager.broadcast({ name: 'personaListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDireccionById(index: number, item: Direccion) {
        return item.id;
    }

    trackEstadoPersonaById(index: number, item: EstadoPersona) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-persona-popup',
    template: ''
})
export class PersonaPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private personaPopupService: PersonaPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.personaPopupService.open(PersonaDialogComponent as Component, params['id']);
            } else {
                this.personaPopupService.open(PersonaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
