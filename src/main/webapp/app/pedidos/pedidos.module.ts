import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { PEDIDOS_ROUTE } from './pedidos.route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [CommonModule, BrowserModule, RouterModule.forRoot([PEDIDOS_ROUTE], { useHash: true })],
    exports: [RouterModule],
    entryComponents: [PedidosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PedidosComponent]
})
export class PedidosModule {}
