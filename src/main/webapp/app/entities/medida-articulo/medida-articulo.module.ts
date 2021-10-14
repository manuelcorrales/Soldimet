import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MedidaArticuloComponent } from './list/medida-articulo.component';
import { MedidaArticuloDetailComponent } from './detail/medida-articulo-detail.component';
import { MedidaArticuloUpdateComponent } from './update/medida-articulo-update.component';
import { MedidaArticuloDeleteDialogComponent } from './delete/medida-articulo-delete-dialog.component';
import { MedidaArticuloRoutingModule } from './route/medida-articulo-routing.module';

@NgModule({
  imports: [SharedModule, MedidaArticuloRoutingModule],
  declarations: [
    MedidaArticuloComponent,
    MedidaArticuloDetailComponent,
    MedidaArticuloUpdateComponent,
    MedidaArticuloDeleteDialogComponent,
  ],
  entryComponents: [MedidaArticuloDeleteDialogComponent],
})
export class MedidaArticuloModule {}
