import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { RouterModule } from '@angular/router';
import { CLIENTES_POPUP_ROUTE, CLIENTES_ROUTE } from './clientes.route';
import { SoldimetSharedModule } from '../shared/shared.module';
import { ModalNuevoClienteComponent, ClienteModalPopupComponent } from './modal-nuevo-cliente/modal-nuevo-cliente.component';
import { ClienteService } from '../entities/cliente/cliente.service';
import { ClienteBorrarPopupService } from './modal-borrar-cliente/cliente-modal-popup.service';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteBorrarDialogComponent, ClienteBorrarPopupComponent } from './modal-borrar-cliente/cliente-borrar-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteModalPopupService } from './modal-nuevo-cliente/cliente-nuevo-popup-service';

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
        ClienteBorrarDialogComponent
    ],
    entryComponents: [
        ClientesComponent,
        ModalNuevoClienteComponent,
        ClienteModalPopupComponent,
        ClienteBorrarPopupComponent,
        ClienteBorrarDialogComponent
    ],
    providers: [ClienteService, ClienteModalPopupService, ClienteBorrarPopupService]
})
export class ClientesModule {}
