import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoArticuloComponent } from 'app/entities/estado-articulo/estado-articulo.component';
import { EstadoArticuloDetailComponent } from 'app/entities/estado-articulo/estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from 'app/entities/estado-articulo/estado-articulo-update.component';
import {
  EstadoArticuloDeletePopupComponent,
  EstadoArticuloDeleteDialogComponent
} from 'app/entities/estado-articulo/estado-articulo-delete-dialog.component';
import { estadoArticuloRoute, estadoArticuloPopupRoute } from 'app/entities/estado-articulo/estado-articulo.route';

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
