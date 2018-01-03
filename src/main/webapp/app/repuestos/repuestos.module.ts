import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepuestosComponent } from './repuestos.component';
import {REPUESTOS_ROUTE} from "./repuestos.route";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forRoot([ REPUESTOS_ROUTE ], { useHash: true })
  ],
    exports:[
        RouterModule,
    ],
  declarations: [RepuestosComponent]
})
export class RepuestosModule { }
