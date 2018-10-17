import { Component, OnInit } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-pedidos-pendientes',
    templateUrl: './pedidos-pendientes.component.html',
    styles: []
})
export class PedidosPendientesComponent implements OnInit {
    pedidos: PedidoRepuesto[];
    proveedores: Proveedor[];
    pedidoElegido: PedidoRepuesto;

    constructor(private pedidosServices: PedidosService, private modalService: NgbActiveModal) {}

    ngOnInit() {
        this.pedidosServices.getPedidosPendientes().subscribe((pedidos: PedidoRepuesto[]) => {
            this.pedidos = pedidos;
        });

        this.pedidosServices.getProveedoresRepuestos().subscribe((proveedores: Proveedor[]) => {
            this.proveedores = proveedores;
        });
    }

    setPedido(pedido) {
        this.pedidoElegido = pedido;
    }
}

import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PedidoService } from 'app/entities/pedidos';

@Injectable()
export class PedidoModalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private pedidoService: PedidoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.pedidoService.find(id).subscribe(pedido => {
                    this.ngbModalRef = this.pedidoModalRef(component, pedido.body);
                    resolve(this.ngbModalRef);
                });
            } else {
                setTimeout(() => {
                    const pedido = new PedidoRepuesto();
                    const persona = new Persona();
                    const direccion = new Direccion();
                    cliente.persona = persona;
                    persona.direccion = direccion;
                    this.ngbModalRef = this.pedidoModalRef(component, cliente);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pedidoModalRef(component: Component, cliente: Cliente): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.cliente = cliente;
        modalRef.componentInstance.persona = cliente.persona;
        const persona: Persona = cliente.persona as Persona;
        modalRef.componentInstance.direccion = persona.direccion;
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
