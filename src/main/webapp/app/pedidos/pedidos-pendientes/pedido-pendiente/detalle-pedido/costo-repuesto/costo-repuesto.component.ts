import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-costo-repuesto',
  templateUrl: './costo-repuesto.component.html',
  styles: []
})
export class CostoRepuestoComponent implements OnInit {
  @Input()
  costoRepuesto: CostoRepuesto;

  isSaving = false;
  isEditing = false;
  isPendiente = false;
  isPedido = false;
  isRecibido = false;

  @ViewChild('instanceNTAProv', { static: false })
  instanceProv: NgbTypeahead;
  focusProv$ = new Subject<string>();
  clickProv$ = new Subject<string>();

  constructor(
    config: NgbTypeaheadConfig,
    private pedidoService: PedidosService,
    private eventManager: JhiEventManager,
    private jhiAlertService: JhiAlertService
  ) {
    // customize default values of typeaheads used by this component tree
    config.showHint = true;
    config.container = true;
  }

  ngOnInit() {
    this.checkCostoStatus();
    if (this.isPendiente) {
      // Si todavía esta pendiente de pedido, que pueda ingresar valores en el form
      this.isEditing = true;
    }
  }
  editarCostoRepuesto() {
    this.isEditing = true;
  }

  cancelarEditarCostoRepuesto() {
    this.isEditing = false;
  }

  getCostoRepuesto() {
    return this.costoRepuesto;
  }

  actualizarPedidoDetalle() {
    this.isSaving = true;
    this.updatePedidoDetalle();
  }

  updatePedidoDetalle() {
    this.pedidoService.updatePedidoDetalle(this.costoRepuesto).subscribe(
      nuevoCosto => {
        this.costoRepuesto = nuevoCosto;
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK' });
        this.isEditing = false;
        this.isSaving = false;
        this.checkCostoStatus();
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }

  recibirRepuesto() {
    this.isSaving = true;
    this.pedidoService.recibirRepuesto(this.costoRepuesto).subscribe(
      (costo: CostoRepuesto) => {
        this.costoRepuesto = costo;
        this.isSaving = false;
        this.checkCostoStatus();
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK' });
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }

  private checkCostoStatus() {
    if (this.costoRepuesto.estado.nombreEstado === 'Pedido') {
      this.isPedido = true;
    }
    if (this.costoRepuesto.estado.nombreEstado === 'Recibido') {
      this.isRecibido = true;
    }
    if (this.costoRepuesto.estado.nombreEstado === 'Pendiente de pedido') {
      this.isPendiente = true;
    }
  }
}
