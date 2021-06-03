import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MedidaArticuloComponent } from './medida-articulo.component';
import { MedidaArticuloDetailComponent } from './medida-articulo-detail.component';
import { MedidaArticuloUpdateComponent } from './medida-articulo-update.component';
import { MedidaArticuloDeletePopupComponent, MedidaArticuloDeleteDialogComponent } from './medida-articulo-delete-dialog.component';
import { medidaArticuloRoute, medidaArticuloPopupRoute } from './medida-articulo.route';

const ENTITY_STATES = [...medidaArticuloRoute, ...medidaArticuloPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MedidaArticuloComponent,
    MedidaArticuloDetailComponent,
    MedidaArticuloUpdateComponent,
    MedidaArticuloDeleteDialogComponent,
    MedidaArticuloDeletePopupComponent
  ],
  entryComponents: [
    MedidaArticuloComponent,
    MedidaArticuloUpdateComponent,
    MedidaArticuloDeleteDialogComponent,
    MedidaArticuloDeletePopupComponent
  ]
})
export class SoldimetMedidaArticuloModule {}
