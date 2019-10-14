import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ListaPrecioRectificacionCRAMComponent } from './lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from './lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from './lista-precio-rectificacion-cram-update.component';
import {
  ListaPrecioRectificacionCRAMDeletePopupComponent,
  ListaPrecioRectificacionCRAMDeleteDialogComponent
} from './lista-precio-rectificacion-cram-delete-dialog.component';
import { listaPrecioRectificacionCRAMRoute, listaPrecioRectificacionCRAMPopupRoute } from './lista-precio-rectificacion-cram.route';

const ENTITY_STATES = [...listaPrecioRectificacionCRAMRoute, ...listaPrecioRectificacionCRAMPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMDetailComponent,
    ListaPrecioRectificacionCRAMUpdateComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
    ListaPrecioRectificacionCRAMDeletePopupComponent
  ],
  entryComponents: [
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMUpdateComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
    ListaPrecioRectificacionCRAMDeletePopupComponent
  ]
})
export class SoldimetListaPrecioRectificacionCRAMModule {}
