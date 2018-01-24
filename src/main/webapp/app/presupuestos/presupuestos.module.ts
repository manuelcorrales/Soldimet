import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestosComponent } from './presupuestos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PRESUPUESTOS_ROUTE } from './presupuestos.route';
import { RouterModule } from '@angular/router';
import { NuevoPresupuestoComponent } from './nuevo-presupuesto/nuevo-presupuesto.component';
import { BrowserModule } from '@angular/platform-browser';
import { SoldimetSharedModule } from '../shared/shared.module';
import { PresupuestosService } from "./presupuestos.service";



@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      NgxDatatableModule,
      SoldimetSharedModule,
      RouterModule.forRoot([ PRESUPUESTOS_ROUTE ], { useHash: true })

  ],
  declarations: [
      PresupuestosComponent,
      NuevoPresupuestoComponent,
  ],
    entryComponents: [

    ],
  providers: [
      PresupuestosService
  ],
    exports:[
        RouterModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PresupuestosModule {

}
