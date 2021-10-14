import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClientesComponent } from 'app/clientes/clientes.component';
import { RouterModule } from '@angular/router';
import { CLIENTES_POPUP_ROUTE, CLIENTES_ROUTE } from 'app/clientes/clientes.route';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ModalNuevoClienteComponent, ClienteModalPopupComponent } from 'app/clientes/modal-nuevo-cliente/modal-nuevo-cliente.component';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { ClienteBorrarPopupService } from 'app/clientes/modal-borrar-cliente/cliente-modal-popup.service';
import { BrowserModule } from '@angular/platform-browser';
import {
  ClienteBorrarDialogComponent,
  ClienteBorrarPopupComponent,
} from 'app/clientes/modal-borrar-cliente/cliente-borrar-dialog.component';
import { ClienteModalPopupService } from 'app/clientes/modal-nuevo-cliente/cliente-nuevo-popup-service';
import { ClientesService } from 'app/clientes/clientes.service';

const CLIENTES_ROUTES_ALL = [...CLIENTES_ROUTE, ...CLIENTES_POPUP_ROUTE];

@NgModule({
  imports: [SoldimetSharedModule, BrowserModule, RouterModule.forRoot(CLIENTES_ROUTES_ALL, { useHash: true })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ClientesComponent,
    ModalNuevoClienteComponent,
    ClienteModalPopupComponent,
    ClienteBorrarPopupComponent,
    ClienteBorrarDialogComponent,
  ],
  entryComponents: [
    ClientesComponent,
    ModalNuevoClienteComponent,
    ClienteModalPopupComponent,
    ClienteBorrarPopupComponent,
    ClienteBorrarDialogComponent,
  ],
  providers: [ClienteService, ClienteModalPopupService, ClienteBorrarPopupService, ClientesService],
})
export class ClientesModule {}
