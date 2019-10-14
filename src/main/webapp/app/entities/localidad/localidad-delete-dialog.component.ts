import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'jhi-localidad-delete-dialog',
  templateUrl: './localidad-delete-dialog.component.html'
})
export class LocalidadDeleteDialogComponent {
  localidad: ILocalidad;

  constructor(protected localidadService: LocalidadService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.localidadService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'localidadListModification',
        content: 'Deleted an localidad'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-localidad-delete-popup',
  template: ''
})
export class LocalidadDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ localidad }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LocalidadDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.localidad = localidad;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/localidad', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/localidad', { outlets: { popup: null } }]);
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
