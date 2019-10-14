import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoArticuloComponent } from './estado-articulo.component';
import { EstadoArticuloDetailComponent } from './estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from './estado-articulo-update.component';
import { EstadoArticuloDeletePopupComponent, EstadoArticuloDeleteDialogComponent } from './estado-articulo-delete-dialog.component';
import { estadoArticuloRoute, estadoArticuloPopupRoute } from './estado-articulo.route';

const ENTITY_STATES = [...estadoArticuloRoute, ...estadoArticuloPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloUpdateComponent,
    EstadoArticuloDeleteDialogComponent,
    EstadoArticuloDeletePopupComponent
  ],
  entryComponents: [
    EstadoArticuloComponent,
    EstadoArticuloUpdateComponent,
    EstadoArticuloDeleteDialogComponent,
    EstadoArticuloDeletePopupComponent
  ]
})
export class SoldimetEstadoArticuloModule {}
