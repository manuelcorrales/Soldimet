import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoParteMotor } from './tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Injectable()
export class TipoParteMotorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private tipoParteMotorService: TipoParteMotorService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tipoParteMotorService.find(id).subscribe(tipoParteMotor => {
                    this.ngbModalRef = this.tipoParteMotorModalRef(component, tipoParteMotor);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoParteMotorModalRef(component, new TipoParteMotor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoParteMotorModalRef(component: Component, tipoParteMotor: TipoParteMotor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.tipoParteMotor = tipoParteMotor;
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
