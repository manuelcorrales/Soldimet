import { EventManager } from 'app/core/util/event-manager.service';
import { AlertService } from 'app/core/util/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteModalPopupService } from 'app/clientes/modal-nuevo-cliente/cliente-nuevo-popup-service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalidadService } from 'app/entities/localidad/service/localidad.service';
import { EstadoPersonaService } from 'app/entities/estado-persona/service/estado-persona.service';
import { Cliente } from 'app/entities/cliente/cliente.model';
import { Persona } from 'app/entities/persona/persona.model';
import { Direccion } from 'app/entities/direccion/direccion.model';
import { Localidad } from 'app/entities/localidad/localidad.model';
import { EstadoPersona } from 'app/entities/estado-persona/estado-persona.model';
import { DireccionService } from 'app/entities/direccion/service/direccion.service';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-modal-nuevo-cliente',
  templateUrl: './modal-nuevo-cliente.component.html',
})
export class ModalNuevoClienteComponent implements OnInit {
  cliente: Cliente | null = null;
  persona: Persona | null = null;
  direccion: Direccion | null = null;
  isSaving = false;
  localidades: Localidad[] | null = null;
  personas: Persona[] | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private eventManager: EventManager,
    private localidadService: LocalidadService,
    private direccionService: DireccionService,
    private estadoPersonaService: EstadoPersonaService
  ) {
    if (this.cliente == null) {
      this.cliente = new Cliente();
      this.persona = new Persona();
    }
    if (this.direccion == null) {
      this.direccion = new Direccion();
      this.persona!.direccion = this.direccion;
      this.cliente.persona = this.persona!;
    }
  }

  ngOnInit() {
    this.isSaving = false;
    this.localidadService.query().subscribe(
      (res: HttpResponse<Localidad[]>) => {
        this.localidades = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.direccion?.calle !== undefined || this.direccion?.localidad !== undefined || this.direccion?.numero !== undefined) {
      if (this.direccion.id !== undefined) {
        this.subscribeToSaveDireccionResponse(this.direccionService.update(this.direccion));
      } else {
        this.subscribeToSaveDireccionResponse(this.direccionService.create(this.direccion));
      }
    } else {
      // Guardo el cliente sin la direccion
      this.onSaveDireccionSuccess(null);
    }
  }

  private subscribeToSaveDireccionResponse(result: Observable<HttpResponse<Direccion>>) {
    result.subscribe(
      (res: HttpResponse<Direccion>) => this.onSaveDireccionSuccess(res.body),
      () => this.onSaveDireccionError()
    );
  }

  private onSaveDireccionSuccess(result: Direccion | null) {
    this.persona!.direccion = result;
    this.estadoPersonaService.find(1).subscribe((estado: HttpResponse<EstadoPersona>) => {
      this.persona!.estadoPersona = estado.body;
      if (this.persona?.id !== undefined) {
        this.subscribeToSavePersonaResponse(this.personaService.update(this.persona));
      } else {
        this.subscribeToSavePersonaResponse(this.personaService.create(this.persona!));
      }
    });
  }

  private onSaveDireccionError() {
    this.isSaving = false;
  }

  private subscribeToSavePersonaResponse(result: Observable<HttpResponse<Persona>>) {
    result.subscribe(
      (res: HttpResponse<Persona>) => this.onSavePersonaSuccess(res.body!),
      () => this.onSavePersonaError()
    );
  }

  private onSavePersonaSuccess(result: Persona) {
    this.cliente!.persona = result;
    if (this.cliente?.id !== undefined) {
      this.subscribeToSaveClienteResponse(this.clienteService.update(this.cliente));
    } else {
      this.subscribeToSaveClienteResponse(this.clienteService.create(this.cliente!));
    }
  }

  private onSavePersonaError() {
    this.isSaving = false;
  }

  private subscribeToSaveClienteResponse(result: Observable<HttpResponse<Cliente>>) {
    result.subscribe(
      (res: HttpResponse<Cliente>) => this.onSaveClienteSuccess(res.body!),
      () => this.onSaveClienteError()
    );
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
    this.alertService.addAlert(error.message);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  trackLocalidadById(index: number, item: Localidad) {
    return item.id;
  }
}

@Component({
  selector: 'jhi-cliente-modal-popup',
  template: '',
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
