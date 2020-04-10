import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ClienteComponent } from 'app/entities/cliente/cliente.component';
import { ClienteDetailComponent } from 'app/entities/cliente/cliente-detail.component';
import { ClienteUpdateComponent } from 'app/entities/cliente/cliente-update.component';
import { ClienteDeletePopupComponent, ClienteDeleteDialogComponent } from 'app/entities/cliente/cliente-delete-dialog.component';
import { clienteRoute, clientePopupRoute } from 'app/entities/cliente/cliente.route';

const ENTITY_STATES = [...clienteRoute, ...clientePopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClienteComponent,
    ClienteDetailComponent,
    ClienteUpdateComponent,
    ClienteDeleteDialogComponent,
    ClienteDeletePopupComponent
  ],
  entryComponents: [ClienteComponent, ClienteUpdateComponent, ClienteDeleteDialogComponent, ClienteDeletePopupComponent]
})
export class SoldimetClienteModule {}
