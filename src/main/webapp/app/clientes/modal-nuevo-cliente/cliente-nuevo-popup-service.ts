import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ClientesService } from 'app/clientes/clientes.service';
import { Cliente } from 'app/entities/cliente/cliente.model';
import { Persona } from 'app/entities/persona/persona.model';
import { Direccion } from 'app/entities/direccion/direccion.model';

@Injectable()
export class ClienteModalPopupService {
  private ngbModalRef: NgbModalRef | null;

  constructor(private modalService: NgbModal, private router: Router, private clienteService: ClientesService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>(resolve => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef!);
      }
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente: Cliente) => {
          this.ngbModalRef = this.clienteModalRef(component, cliente);
          resolve(this.ngbModalRef);
        });
      } else {
        setTimeout(() => {
          const cliente = new Cliente();
          const persona = new Persona();
          const direccion = new Direccion();
          cliente.persona = persona;
          persona.direccion = direccion;
          this.ngbModalRef = this.clienteModalRef(component, cliente);
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  clienteModalRef(component: Component, cliente: Cliente): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.persona = cliente.persona;
    const persona: Persona = cliente.persona as Persona;
    if (persona.direccion != null) {
      modalRef.componentInstance.direccion = persona.direccion;
    }
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
