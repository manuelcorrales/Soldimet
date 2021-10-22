import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Cliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Injectable()
export class ClienteBorrarPopupService {
  private ngbModalRef: NgbModalRef | null;

  constructor(private modalService: NgbModal, private router: Router, private clienteService: ClienteService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>(resolve => {
      if (this.ngbModalRef !== null) {
        resolve(this.ngbModalRef);
      }
      if (id) {
        this.clienteService.find(id).subscribe(res => {
          this.ngbModalRef = this.clienteModalRef(component, res.body!);
          resolve(this.ngbModalRef);
        });
      } else {
        setTimeout(() => {
          this.ngbModalRef = this.clienteModalRef(component, new Cliente());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  clienteModalRef(component: Component, cliente: Cliente): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cliente = cliente;
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
