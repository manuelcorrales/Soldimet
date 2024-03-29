import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';
import { StockService } from 'app/stock/stock.service';

@Component({
  selector: 'jhi-costo-repuesto',
  templateUrl: './costo-repuesto.component.html',
  styles: []
})
export class CostoRepuestoComponent implements OnInit {
  @Input()
  costoRepuesto: CostoRepuesto;
  @Input()
  medidas: IMedidaArticulo[];

  buscoStock = false;
  hayStock = false;
  stockArticulo: StockArticulo;
  alcanzaStock = false;

  isSaving = false;
  isEditing = false;
  isPendiente = false;
  isPedido = false;
  isRecibido = false;
  isStock = false;

  @ViewChild('instanceNTAProv', { static: false })
  instanceProv: NgbTypeahead;
  focusProv$ = new Subject<string>();
  clickProv$ = new Subject<string>();

  constructor(
    config: NgbTypeaheadConfig,
    private pedidoService: PedidosService,
    private eventManager: JhiEventManager,
    private jhiAlertService: JhiAlertService,
    private stockService: StockService
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

  reservarStock() {
    this.isSaving = true;
    this.costoRepuesto.estado.nombreEstado = 'En Stock';
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
    if (this.costoRepuesto.estado.nombreEstado === 'En Stock') {
      this.isStock = true;
    }
  }

  revisarEnStock() {
    if (this.costoRepuesto.articulo != null && this.costoRepuesto.medidaArticulo != null) {
      // Voy a revisar si hay en stock y mostrar cuantos quedan
      this.stockService.buscarStock(this.costoRepuesto.medidaArticulo, this.costoRepuesto.articulo).subscribe(
        (stock: StockArticulo) => {
          this.stockArticulo = stock;
          this.buscoStock = true;
          if (stock != null && stock.cantidad > 0) {
            this.hayStock = true;
          } else {
            this.hayStock = false;
          }
        },
        error => {
          this.jhiAlertService.error('No se pudo buscar en Stock.');
          this.buscoStock = true;
        }
      );
    }
  }

  revisarAlcanzaEnStock() {
    if (this.costoRepuesto.articulo != null && this.costoRepuesto.medidaArticulo != null && this.hayStock) {
      // Si pienso usar stock valido la cantidad usada con lo que se que hay en stock
      if (this.stockArticulo.cantidad >= this.costoRepuesto.valor) {
        this.alcanzaStock = true;
      } else {
        this.alcanzaStock = false;
      }
    }
  }
}
