import { Component, OnInit, ViewChild, Injectable, ViewContainerRef } from '@angular/core';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-pedidos',
  templateUrl: './pedidos.component.html',
  styles: ['.pedidos-style.css'],
})
export class PedidosComponent implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  eventSubscriber: Subscription;

  page = 1;
  pageSize = 25;

  pedidos: DtoPedidoCabecera[] = [];
  totalPedidos: DtoPedidoCabecera[] = [];

  constructor(private newPedidoService: PedidosService, private eventManager: JhiEventManager) {}

  ngOnInit() {
    this.loadPedidos();
    this.eventSubscriber = this.eventManager.subscribe('pedidoListModification', response => this.loadPedidos());
  }

  loadPedidos() {
    this.newPedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
      const pedidosOrdenados = pedidos.sort(this._sortPedidos);
      this.totalPedidos = pedidosOrdenados;
      this.pedidos = pedidosOrdenados;
    });
  }

  verPedido(id: number) {}

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
  private ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router, private pedidoService: PedidosService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
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
      result => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      },
      reason => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}
