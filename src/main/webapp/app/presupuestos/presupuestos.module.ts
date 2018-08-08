import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestosComponent } from './presupuestos.component';
import { PRESUPUESTOS_ROUTES } from './presupuestos.route';
import { RouterModule } from '@angular/router';
import { NuevoPresupuestoComponent } from './nuevo-presupuesto/nuevo-presupuesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { SoldimetSharedModule } from '../shared/shared.module';
import { PresupuestosService } from './presupuestos.service';
import { ClientesNuevopresupuestoComponent } from './nuevo-presupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto.component';
import { MotorNuevoPresupuestoComponent } from './nuevo-presupuesto/clientes-nuevopresupuesto/motor-nuevo-presupuesto/motor-nuevo-presupuesto.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RepuestosNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto.component';
import { OperacionesNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto.component';
import { RepuestoPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuesto_precio/repuesto-precio.component';
import { OperacionPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operacion_precio/operacion-precio.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [NgSelectModule, BrowserModule, FormsModule, SoldimetSharedModule, CommonModule, RouterModule.forChild(PRESUPUESTOS_ROUTES)],
    declarations: [
        PresupuestosComponent,
        NuevoPresupuestoComponent,
        ClientesNuevopresupuestoComponent,
        OperacionesNuevopresupuestoComponent,
        RepuestosNuevopresupuestoComponent,
        MotorNuevoPresupuestoComponent,
        OperacionPrecioComponent,
        RepuestoPrecioComponent
    ],
    entryComponents: [
        PresupuestosComponent,
        NuevoPresupuestoComponent,
        ClientesNuevopresupuestoComponent,
        OperacionesNuevopresupuestoComponent,
        RepuestosNuevopresupuestoComponent,
        MotorNuevoPresupuestoComponent
    ],
    providers: [PresupuestosService, NgbActiveModal],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PresupuestosModule {}
