import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Cliente } from '../../entities/cliente/cliente.model';
import { Persona } from '../../entities/persona/persona.model';
import { Direccion } from '../../entities/direccion/direccion.model';
import { Localidad } from '../../entities/localidad/localidad.model';
import { LocalidadService } from '../../entities/localidad/localidad.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResponseWrapper } from '../../shared/model/response-wrapper.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { PersonaService } from '../../entities/persona/persona.service';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../entities/cliente/cliente.service';
import { DireccionService } from '../../entities/direccion/direccion.service';
import { EstadoPersonaService, EstadoPersona } from '../../entities/estado-persona';
import { ClienteModalPopupService } from './cliente-nuevo-popup-service';

@Component({
    selector: 'jhi-modal-nuevo-cliente',
    templateUrl: './modal-nuevo-cliente.component.html'
})
export class ModalNuevoClienteComponent implements OnInit {
    cliente: Cliente;
    persona: Persona;
    direccion: Direccion;
    isSaving = false;
    localidades: Localidad[];
    personas: Persona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clienteService: ClienteService,
        private personaService: PersonaService,
        private eventManager: JhiEventManager,
        private localidadService: LocalidadService,
        private direccionService: DireccionService,
        private estadoPersonaService: EstadoPersonaService
    ) {
        this.cliente = new Cliente();
        this.persona = new Persona();
        this.direccion = new Direccion();
        this.persona.direccion = this.direccion;
        this.cliente.persona = this.persona;
    }

    ngOnInit() {
        this.isSaving = false;
        this.localidadService.query().subscribe(
            (res: ResponseWrapper) => {
                this.localidades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.direccion.id !== undefined) {
            this.subscribeToSaveDireccionResponse(this.direccionService.update(this.direccion));
        } else {
            this.subscribeToSaveDireccionResponse(this.direccionService.create(this.direccion));
        }
    }

    private subscribeToSaveDireccionResponse(result: Observable<Direccion>) {
        result.subscribe((res: Direccion) => this.onSaveDireccionSuccess(res), (res: Response) => this.onSaveDireccionError());
    }

    private onSaveDireccionSuccess(result: Direccion) {
        this.persona.direccion = result;
        this.estadoPersonaService.find(1).subscribe((estado: EstadoPersona) => {
            this.persona.estadoPersona = estado;
            if (this.persona.id !== undefined) {
                this.subscribeToSavePersonaResponse(this.personaService.update(this.persona));
            } else {
                this.subscribeToSavePersonaResponse(this.personaService.create(this.persona));
            }
        });
    }

    private onSaveDireccionError() {
        this.isSaving = false;
    }

    private subscribeToSavePersonaResponse(result: Observable<Persona>) {
        result.subscribe((res: Persona) => this.onSavePersonaSuccess(res), (res: Response) => this.onSavePersonaError());
    }

    private onSavePersonaSuccess(result: Persona) {
        this.cliente.persona = result;
        if (this.cliente.id !== undefined) {
            this.subscribeToSaveClienteResponse(this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveClienteResponse(this.clienteService.create(this.cliente));
        }
    }

    private onSavePersonaError() {
        this.isSaving = false;
    }

    private subscribeToSaveClienteResponse(result: Observable<Cliente>) {
        result.subscribe((res: Cliente) => this.onSaveClienteSuccess(res), (res: Response) => this.onSaveClienteError());
    }

    private onSaveClienteSuccess(result: Cliente) {
        this.eventManager.broadcast({ name: 'clienteListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveClienteError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocalidadById(index: number, item: Localidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cliente-modal-popup',
    template: ''
})
export class ClienteModalPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private clientePopupService: ClienteModalPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.clientePopupService.open(ModalNuevoClienteComponent as Component, params['id']);
            } else {
                this.clientePopupService.open(ModalNuevoClienteComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
