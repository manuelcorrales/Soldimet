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
            const presupuestos = this.presupuestos.filter(obj => obj.codigo !== dto.codigo);
            presupuestos.push(dto);
            this.presupuestos = presupuestos;
        });
    }

    cancelarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
        this._presupuestosService.cancelarPresupuesto(dtoPResupuesto).subscribe(dto => {
            const presupuestos = this.presupuestos.filter(obj => obj.codigo !== dto.codigo);
            presupuestos.push(dto);
            this.presupuestos = presupuestos;
        });
    }

    terminarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
        this._presupuestosService.terminarPresupuesto(dtoPResupuesto).subscribe(
            (dto: DtoPresupuestoCabeceraComponent) => {
                const presupuestos = this.presupuestos.filter(obj => obj.codigo !== dto.codigo);
                presupuestos.push(dto);
                this.presupuestos = presupuestos;
            },
            res => {
                this.jhiAlertService.error('No se puede terminar este presupuesto por que existe un pedido no terminado!');
            }
        );
    }

    entregarPresupuesto(dtoPResupuesto: DtoPresupuestoCabeceraComponent) {
        this._presupuestosService.entregarPresupuesto(dtoPResupuesto).subscribe(
            (dto: DtoPresupuestoCabeceraComponent) => {
                const presupuestos = this.presupuestos.filter(obj => obj.codigo !== dto.codigo);
                presupuestos.push(dto);
                this.presupuestos = presupuestos;
            },
            res => {
                this.jhiAlertService.error('Este presupuesto no esta termina, no se puede entregar!');
            }
        );
    }
}
