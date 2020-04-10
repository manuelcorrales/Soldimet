import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ListaPrecioRectificacionCRAMComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-update.component';
import {
  ListaPrecioRectificacionCRAMDeletePopupComponent,
  ListaPrecioRectificacionCRAMDeleteDialogComponent
} from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-delete-dialog.component';
import {
  listaPrecioRectificacionCRAMRoute,
  listaPrecioRectificacionCRAMPopupRoute
} from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.route';

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
