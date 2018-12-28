import { Component, OnInit } from '@angular/core';
import { DtoCajaDiaComponent } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';

@Component({
    selector: 'jhi-caja',
    templateUrl: './caja.component.html',
    styles: []
})
export class CajaComponent implements OnInit {
    cajaDia: DtoCajaDiaComponent;

    constructor(private cajaService: CajaModuleServiceService) {}

    ngOnInit() {
        this.cajaService.getMovimientosDia().subscribe((cajaDia: DtoCajaDiaComponent) => {
            this.cajaDia = cajaDia;
        });
    }
}
