import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Component({
    selector: 'jhi-tipo-parte-motor-delete-dialog',
    templateUrl: './tipo-parte-motor-delete-dialog.component.html'
})
export class TipoParteMotorDeleteDialogComponent {
    tipoParteMotor: ITipoParteMotor;

    constructor(
        private tipoParteMotorService: TipoParteMotorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoParteMotorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoParteMotorListModification',
                content: 'Deleted an tipoParteMotor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-parte-motor-delete-popup',
    template: ''
})
export class TipoParteMotorDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoParteMotorDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoParteMotor = tipoParteMotor;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
