import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ListaPrecioDesdeHastaComponent } from './lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from './lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaUpdateComponent } from './lista-precio-desde-hasta-update.component';
import {
  ListaPrecioDesdeHastaDeletePopupComponent,
  ListaPrecioDesdeHastaDeleteDialogComponent
} from './lista-precio-desde-hasta-delete-dialog.component';
import { listaPrecioDesdeHastaRoute, listaPrecioDesdeHastaPopupRoute } from './lista-precio-desde-hasta.route';

const ENTITY_STATES = [...listaPrecioDesdeHastaRoute, ...listaPrecioDesdeHastaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaDetailComponent,
    ListaPrecioDesdeHastaUpdateComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
    ListaPrecioDesdeHastaDeletePopupComponent
  ],
  entryComponents: [
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaUpdateComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
    ListaPrecioDesdeHastaDeletePopupComponent
  ]
})
export class SoldimetListaPrecioDesdeHastaModule {}
