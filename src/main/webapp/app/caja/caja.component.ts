import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DtoCajaDiaComponent, DtoMovimientoCabecera } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { JhiEventManager } from '../../../../../node_modules/ng-jhipster';

@Component({
    selector: 'jhi-caja',
    templateUrl: './caja.component.html',
    styles: []
})
export class CajaComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;
    eventSubscriber: Subscription;

    page = 1;
    pageSize = 25;

    cajaDia: DtoCajaDiaComponent;
    totalMovimientos: DtoMovimientoCabecera[] = [];
    movimientos: DtoMovimientoCabecera[] = [];

    constructor(private cajaService: CajaModuleServiceService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.eventSubscriber = this.eventManager.subscribe('movimientosDiaModificacion', response => this._buscarMovimientosDelDia());
        this._buscarMovimientosDelDia();
    }

    _buscarMovimientosDelDia() {
        this.cajaService.getMovimientosDia().subscribe((cajaDia: DtoCajaDiaComponent) => {
            const movimientos = cajaDia.movimientos;
            cajaDia.movimientos = movimientos.sort(this._sortMovimientos);
            this.cajaDia = cajaDia;
            this.movimientos = cajaDia.movimientos;
            this.totalMovimientos = cajaDia.movimientos;
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

    search(text: string) {
        const movimientos = this.totalMovimientos.filter(movimiento => {
            const term = text.toLowerCase();
            return movimiento.descripcion.toLowerCase().includes(term) || movimiento.categoria.toLowerCase().includes(term);
        });
        this.movimientos = movimientos.sort(this._sortMovimientos);
    }
}
