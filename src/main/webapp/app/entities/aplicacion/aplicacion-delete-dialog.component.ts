import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

@Component({
  selector: 'jhi-aplicacion-delete-dialog',
  templateUrl: './aplicacion-delete-dialog.component.html'
})
export class AplicacionDeleteDialogComponent {
  aplicacion: IAplicacion;

  constructor(
    protected aplicacionService: AplicacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.aplicacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'aplicacionListModification',
        content: 'Deleted an aplicacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-aplicacion-delete-popup',
  template: ''
})
export class AplicacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ aplicacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AplicacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.aplicacion = aplicacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/aplicacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/aplicacion', { outlets: { popup: null } }]);
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
