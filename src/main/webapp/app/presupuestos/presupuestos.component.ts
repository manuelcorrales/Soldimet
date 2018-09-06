import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-presupuestos',
    templateUrl: './presupuestos.component.html',
    styles: []
})
export class PresupuestosComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;

    presupuestos: DtoPresupuestoCabeceraComponent[] = [];

    constructor(private _presupuestosService: PresupuestosService) {}

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
}
