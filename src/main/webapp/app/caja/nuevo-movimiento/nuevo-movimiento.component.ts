import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { TipoMovimiento, ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { SubCategoria, ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento';
import { FormaDePagoService } from 'app/entities/forma-de-pago';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { HttpResponse, HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';
import { IFormaDePago, FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { SubCategoriaService } from 'app/entities/sub-categoria';

@Component({
    selector: 'jhi-nuevo-movimiento',
    templateUrl: './nuevo-movimiento.component.html',
    styles: []
})
export class NuevoMovimientoComponent implements OnInit {
    movimiento: Movimiento;
    tipos: TipoMovimiento[];
    conceptos: SubCategoria[];
    formasDePago: FormaDePago[];
    isSaving = false;

    constructor(
        private tipoMovimientoService: TipoMovimientoService,
        private formaDePagoService: FormaDePagoService,
        private conceptosService: SubCategoriaService,
        private cajaService: CajaModuleServiceService
    ) {}

    ngOnInit() {
        this.movimiento = new Movimiento();
        this.tipoMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoMovimiento[]>) => {
                this.tipos = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
        this.formaDePagoService.query().subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                this.formasDePago = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
        this.conceptosService.query().subscribe(
            (res: HttpResponse<ISubCategoria[]>) => {
                this.conceptos = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
    }

    private guardarMovimiento() {}
}
