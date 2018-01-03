import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import {RouterModule} from "@angular/router";
import {CLIENTES_ROUTE} from "./clientes.route";

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forRoot([ CLIENTES_ROUTE ], { useHash: true })
  ],
    exports:[
        RouterModule,
    ],
  declarations: [ClientesComponent]
})
export class ClientesModule { }
