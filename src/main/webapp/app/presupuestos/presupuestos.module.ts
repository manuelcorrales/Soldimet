import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestosComponent } from 'app/presupuestos/presupuestos.component';
import { PRESUPUESTOS_ROUTES } from 'app/presupuestos/presupuestos.route';
import { RouterModule } from '@angular/router';
import { NuevoPresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/nuevo-presupuesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'app/shared/shared.module';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { ClientesNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto.component';
import { MotorNuevoPresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/motor-nuevo-presupuesto/motor-nuevo-presupuesto.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RepuestosNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto.component';
import { OperacionesNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto.component';
import { RepuestoPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuesto_precio/repuesto-precio.component';
import { OperacionPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operacion_precio/operacion-precio.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PresupuestoDetailComponent } from './presupuesto-detail/presupuesto-detail.component';

import { FeatureToggleModule } from 'ngx-feature-toggle';

@NgModule({
  imports: [
    NgSelectModule,
    FeatureToggleModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(PRESUPUESTOS_ROUTES),
  ],
  declarations: [
    PresupuestosComponent,
    NuevoPresupuestoComponent,
    ClientesNuevopresupuestoComponent,
    OperacionesNuevopresupuestoComponent,
    RepuestosNuevopresupuestoComponent,
    MotorNuevoPresupuestoComponent,
    OperacionPrecioComponent,
    RepuestoPrecioComponent,
    PresupuestoDetailComponent,
  ],
  entryComponents: [
    PresupuestosComponent,
    NuevoPresupuestoComponent,
    ClientesNuevopresupuestoComponent,
    OperacionesNuevopresupuestoComponent,
    RepuestosNuevopresupuestoComponent,
    MotorNuevoPresupuestoComponent,
  ],
  providers: [PresupuestosService, NgbActiveModal],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PresupuestosModule {}
