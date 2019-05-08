import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { DatePipe } from '@angular/common';
import { JhiAlertService } from '../../../../../node_modules/ng-jhipster';

@Component({
    selector: 'jhi-presupuestos',
    templateUrl: './presupuestos.component.html',
    styles: []
})
export class PresupuestosComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;

    presupuestos: DtoPresupuestoCabeceraComponent[] = [];

    constructor(private _presupuestosService: PresupuestosService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this._presupuestosService.findPresupuestoCabecera().subscribe((presupuestos: DtoPresupuestoCabeceraComponent[]) => {
            this.presupuestos.push(...presupuestos);
        });
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
                this.jhiAlertService.error('No se puede cancelar este presupuesto!', { toast: true });
            }
        );
    }

    terminarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
        this._presupuestosService.terminarPresupuesto(dtoPResupuesto).subscribe(
            (dto: DtoPresupuestoCabeceraComponent) => {
                this._filtrarYAgregarPresupuesto(dto);
            },
            res => {
                this.jhiAlertService.error('No se puede terminar este presupuesto por que existe un pedido no terminado!', { toast: true });
            }
        );
    }

    entregarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
        this._presupuestosService.entregarPresupuesto(dtoPResupuesto).subscribe(
            (dto: DtoPresupuestoCabeceraComponent) => {
                this._filtrarYAgregarPresupuesto(dto);
            },
            res => {
                this.jhiAlertService.error('Este presupuesto no esta terminado, no se puede entregar!', { toast: true });
            }
        );
    }

    _filtrarYAgregarPresupuesto(dto) {
        const presupuestos = this.presupuestos.filter(obj => obj.codigo !== dto.codigo);
        presupuestos.push(dto);
        this.presupuestos = presupuestos.sort(this._sortPresupuesto);
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
