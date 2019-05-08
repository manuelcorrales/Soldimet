import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DtoCajaDiaComponent, DtoMovimientoCabecera } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';

@Component({
    selector: 'jhi-caja',
    templateUrl: './caja.component.html',
    styles: []
})
export class CajaComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;

    cajaDia: DtoCajaDiaComponent;

    constructor(private cajaService: CajaModuleServiceService) {}

    ngOnInit() {
        this.cajaService.getMovimientosDia().subscribe((cajaDia: DtoCajaDiaComponent) => {
            const movimientos = cajaDia.movimientos;
            cajaDia.movimientos = movimientos.sort(this._sortMovimientos);
            this.cajaDia = cajaDia;
        });
    }

    _sortMovimientos(a: DtoMovimientoCabecera, b: DtoMovimientoCabecera) {
        if (a.movimientoId > b.movimientoId) {
            return -1;
        }
        if (a.movimientoId < b.movimientoId) {
            return 1;
        }
        return 0;
    }

    onSearch(searchValue) {}
}
