import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { JhiAlertService } from 'ng-jhipster';
import { saveAs } from 'file-saver';
import { FlagsServiceService } from 'app/shared/flags/flags-service.service';
import { DtoFF } from 'app/shared/flags/dto-ff';
import { BaseFilterPageableComponent } from 'app/shared/base-filter-pageable/base-filter-pageable.component';

@Component({
  selector: 'jhi-presupuestos',
  templateUrl: './presupuestos.component.html',
  styles: []
})
export class PresupuestosComponent extends BaseFilterPageableComponent<DtoPresupuestoCabeceraComponent> implements OnInit {
  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  imprimiendo = false;

  public featureToggleData: any = {
    enableImprimir: false
  };

  constructor(
    protected _presupuestosService: PresupuestosService,
    private jhiAlertService: JhiAlertService,
    private ffStoreService: FlagsServiceService
  ) {
    super();
    this.searchableService = _presupuestosService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.ffStoreService.getFFStore().subscribe(
      (responseList: DtoFF[]) => {
        responseList.forEach((ff: DtoFF) => {
          if (ff.description === 'enableImprimir') {
            this.featureToggleData.enableImprimir = ff.enable;
          }
        });
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }

  aceptarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
    this._presupuestosService.aceptarPresupuesto(dtoPResupuesto).subscribe(dto => {
      this._filtrarYAgregarPresupuesto(dto);
    });
  }

  cancelarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
    this._presupuestosService.cancelarPresupuesto(dtoPResupuesto).subscribe(
      dto => {
        this._filtrarYAgregarPresupuesto(dto);
      },
      res => {
        this.jhiAlertService.error('No se puede cancelar este presupuesto!');
      }
    );
  }

  terminarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
    this._presupuestosService.terminarPresupuesto(dtoPResupuesto).subscribe(
      (dto: DtoPresupuestoCabeceraComponent) => {
        this._filtrarYAgregarPresupuesto(dto);
      },
      res => {
        this.jhiAlertService.error('No se puede terminar este presupuesto por que existe un pedido no terminado!');
      }
    );
  }

  entregarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
    this._presupuestosService.entregarPresupuesto(dtoPResupuesto).subscribe(
      (dto: DtoPresupuestoCabeceraComponent) => {
        this._filtrarYAgregarPresupuesto(dto);
      },
      res => {
        this.jhiAlertService.error('Este presupuesto no esta terminado, no se puede entregar!');
      }
    );
  }

  imprimir(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
    this.imprimiendo = true;
    this._presupuestosService.imprimirPresupuesto(dtoPResupuesto.codigo).subscribe(
      (file: Blob) => {
        saveAs(file, `presupuesto nº ${dtoPResupuesto.codigo}.pdf`);
        this.imprimiendo = false;
      },
      error => {
        this.jhiAlertService.error(`No se pudo imprimir el presupuesto. ${error.message}`);
        this.imprimiendo = false;
      }
    );
  }

  _filtrarYAgregarPresupuesto(dto) {
    const presupuestos = this.content.filter(obj => obj.codigo !== dto.codigo);
    presupuestos.push(dto);
    this.content = presupuestos.sort(this._sortPresupuesto);
  }

  _sortPresupuesto(a: DtoPresupuestoCabeceraComponent, b: DtoPresupuestoCabeceraComponent) {
    if (a.codigo < b.codigo) {
      return 1;
    }
    if (a.codigo > b.codigo) {
      return -1;
    }
    return 0;
  }
}
