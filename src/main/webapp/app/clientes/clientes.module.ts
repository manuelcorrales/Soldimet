import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { RouterModule } from '@angular/router';
import { CLIENTES_POPUP_ROUTE, CLIENTES_ROUTE } from './clientes.route';
import { SoldimetSharedModule } from '../shared/shared.module';
import {
    ModalNuevoClienteComponent, ClienteModalPopupComponent
} from './modal-nuevo-cliente/modal-nuevo-cliente.component';
import { ClienteService } from '../entities/cliente/cliente.service';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { ClienteModalPopupService } from './modal-nuevo-cliente/cliente-modal-popup.service';
import { BrowserModule } from '@angular/platform-browser';

const CLIENTES_ROUTES_ALL = [
    ...CLIENTES_ROUTE,
    ...CLIENTES_POPUP_ROUTE,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        BrowserModule,
        RouterModule.forRoot(CLIENTES_ROUTES_ALL, { useHash: true })
    ],
    exports: [
        RouterModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        ClientesComponent,
        ModalNuevoClienteComponent,
        ClienteModalPopupComponent,

    ],
    entryComponents: [
        ClientesComponent,
        ModalNuevoClienteComponent,
        ClienteModalPopupComponent,

    ],
    providers: [
        ClienteService,
        ClienteModalPopupService,
        NgbActiveModal,
    ],
})
export class ClientesModule { }
