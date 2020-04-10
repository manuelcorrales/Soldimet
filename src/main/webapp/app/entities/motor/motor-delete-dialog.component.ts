import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';

@Component({
  selector: 'jhi-motor-delete-dialog',
  templateUrl: './motor-delete-dialog.component.html'
})
export class MotorDeleteDialogComponent {
  motor: IMotor;

  constructor(protected motorService: MotorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.motorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'motorListModification',
        content: 'Deleted an motor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-motor-delete-popup',
  template: ''
})
export class MotorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ motor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MotorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.motor = motor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/motor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/motor', { outlets: { popup: null } }]);
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
