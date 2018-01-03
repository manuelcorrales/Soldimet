import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestosComponent } from './presupuestos.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
//import { } from 'rxjs/operators';
import { PRESUPUESTOS_ROUTE } from './presupuestos.route';
import { RouterModule } from "@angular/router";
import { NuevoPresupuestoComponent } from './nuevo-presupuesto/nuevo-presupuesto.component';
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  imports: [
      CommonModule,
      NgxDatatableModule,
      BrowserModule,
      RouterModule.forRoot([ PRESUPUESTOS_ROUTE ], { useHash: true })

  ],
  declarations: [
      PresupuestosComponent,
      NuevoPresupuestoComponent,
  ],
  entryComponents: [

  ],
  providers: [

  ],
    exports:[
        RouterModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PresupuestosModule {

}
