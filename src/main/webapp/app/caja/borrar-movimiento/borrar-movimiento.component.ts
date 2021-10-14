import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { BorrarMovimientoPopupService } from 'app/caja/borrar-movimiento/borrar-movimiento-popup.service';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';

@Component({
  selector: 'jhi-borrar-movimiento',
  templateUrl: './borrar-movimiento.component.html',
  styles: [],
})
export class BorrarMovimientoDialogComponent {
  movimiento: Movimiento;

  constructor(
    public movimientoService: CajaModuleServiceService,
    public activeModal: NgbActiveModal,
    public eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete() {
    this.movimientoService.delete(this.movimiento.id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'movimientosDiaModificacion',
        content: 'Movimiento eliminado',
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-movimiento-borrar-popup',
  template: '',
})
export class BorrarMovimientoPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private movimientoPopupService: BorrarMovimientoPopupService) {}
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.movimientoPopupService.open(BorrarMovimientoDialogComponent as Component, params['id']);
      } else {
        this.movimientoPopupService.open(BorrarMovimientoDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
