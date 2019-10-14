import { Component, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento';

@Injectable()
export class BorrarMovimientoPopupService {
  ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router, private movimientoService: MovimientoService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }
      if (id) {
        this.movimientoService.find(id).subscribe(movimiento => {
          this.ngbModalRef = this.movimientoModalRef(component, movimiento.body);
          resolve(this.ngbModalRef);
        });
      } else {
        setTimeout(() => {
          this.ngbModalRef = this.movimientoModalRef(component, new Movimiento());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  movimientoModalRef(component: Component, movimiento: Movimiento): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimiento = movimiento;
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
