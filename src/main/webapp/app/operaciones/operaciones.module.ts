import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperacionesComponent } from './operaciones.component';
import {OPERACIONES_ROUTE} from "./operaciones.route";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forRoot([ OPERACIONES_ROUTE ], { useHash: true })
  ],
    exports:[
        RouterModule,
    ],
  declarations: [OperacionesComponent]
})
export class OperacionesModule { }
