import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaComponent } from './caja.component';
import {CAJA_ROUTE} from "./caja.route";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forRoot([ CAJA_ROUTE ], { useHash: true })
  ],
    exports:[
        RouterModule,
    ],
  declarations: [CajaComponent]
})
export class CajaModule { }
