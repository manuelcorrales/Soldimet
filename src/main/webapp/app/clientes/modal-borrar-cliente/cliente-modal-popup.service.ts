import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ClienteService } from 'app/entities/cliente';
import { Cliente } from 'app/shared/model/cliente.model';

@Injectable()
export class ClienteBorrarPopupService {
  private ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router, private clienteService: ClienteService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }
      if (id) {
        this.clienteService.find(id).subscribe(cliente => {
          this.ngbModalRef = this.clienteModalRef(component, cliente.body);
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
