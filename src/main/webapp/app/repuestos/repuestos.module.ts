import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepuestosComponent } from './repuestos.component';
import {REPUESTOS_ROUTE} from "./repuestos.route";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    CommonModule,
      NgxDatatableModule,
      BrowserModule,
      RouterModule.forRoot([ REPUESTOS_ROUTE ], { useHash: true })
  ],
    exports:[
        RouterModule,
    ],
    entryComponents: [
        RepuestosComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RepuestosComponent]
})
export class RepuestosModule { }
