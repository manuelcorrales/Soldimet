import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ListaPrecioDesdeHastaComponent } from './list/lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from './detail/lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaUpdateComponent } from './update/lista-precio-desde-hasta-update.component';
import { ListaPrecioDesdeHastaDeleteDialogComponent } from './delete/lista-precio-desde-hasta-delete-dialog.component';
import { ListaPrecioDesdeHastaRoutingModule } from './route/lista-precio-desde-hasta-routing.module';

@NgModule({
  imports: [SharedModule, ListaPrecioDesdeHastaRoutingModule],
  declarations: [
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaDetailComponent,
    ListaPrecioDesdeHastaUpdateComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
  ],
  entryComponents: [ListaPrecioDesdeHastaDeleteDialogComponent],
})
export class ListaPrecioDesdeHastaModule {}
