import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-parte-motor-delete-dialog',
  templateUrl: './tipo-parte-motor-delete-dialog.component.html'
})
export class TipoParteMotorDeleteDialogComponent {
  tipoParteMotor: ITipoParteMotor;

  constructor(
    protected tipoParteMotorService: TipoParteMotorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
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
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoParteMotorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoParteMotor = tipoParteMotor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-parte-motor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-parte-motor', { outlets: { popup: null } }]);
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
