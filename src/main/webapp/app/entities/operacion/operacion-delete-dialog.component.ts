import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from './operacion.service';

@Component({
  selector: 'jhi-operacion-delete-dialog',
  templateUrl: './operacion-delete-dialog.component.html'
})
export class OperacionDeleteDialogComponent {
  operacion: IOperacion;

  constructor(protected operacionService: OperacionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.operacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'operacionListModification',
        content: 'Deleted an operacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-operacion-delete-popup',
  template: ''
})
export class OperacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ operacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OperacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.operacion = operacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/operacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/operacion', { outlets: { popup: null } }]);
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
