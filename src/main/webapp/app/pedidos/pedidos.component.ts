import { PedidoRepuesto } from './../entities/pedido-repuesto/pedido-repuesto.model';
import { EventManager } from './../core/util/event-manager.service';
import { Component, OnInit, ViewChild, Injectable, ViewContainerRef } from '@angular/core';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-pedidos',
  templateUrl: './pedidos.component.html',
})
export class PedidosComponent implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef | null = null;

  eventSubscriber: Subscription | null = null;

  page = 1;
  pageSize = 25;

  pedidos: DtoPedidoCabecera[] = [];
  totalPedidos: DtoPedidoCabecera[] = [];

  constructor(private newPedidoService: PedidosService, private eventManager: EventManager) {}

  ngOnInit() {
    this.loadPedidos();
    this.eventSubscriber = this.eventManager.subscribe('pedidoListModification', () => this.loadPedidos());
  }

  loadPedidos() {
    this.newPedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
      const pedidosOrdenados = pedidos.sort(this._sortPedidos);
      this.totalPedidos = pedidosOrdenados;
      this.pedidos = pedidosOrdenados;
    });
  }

  _sortPedidos(a: DtoPedidoCabecera, b: DtoPedidoCabecera) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  search(text: string) {
    const pedidos = this.totalPedidos.filter(pedido => {
      const term = text.toLowerCase();
      return (
        pedido.motor.toLowerCase().includes(term) ||
        pedido.cliente.toLowerCase().includes(term) ||
        pedido.presupuestoId.toString().includes(term)
      );
    });
    this.pedidos = pedidos.sort(this._sortPedidos);
  }
}

@Injectable()
export class PedidoModalPopupService {
  private ngbModalRef: NgbModalRef | null;

  constructor(private modalService: NgbModal, private router: Router, private pedidoService: PedidosService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id: number): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>(resolve => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef!);
      }
      this.pedidoService.getPedido(id).subscribe((pedido: PedidoRepuesto) => {
        this.ngbModalRef = this.pedidoModalRef(component, pedido);
        resolve(this.ngbModalRef);
      });
    });
  }

  pedidoModalRef(component: Component, pedido: PedidoRepuesto): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.pedido = pedido;
    modalRef.result.then(
      () => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      },
      () => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}
