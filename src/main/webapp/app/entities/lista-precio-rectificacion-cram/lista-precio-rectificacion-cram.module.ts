import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ListaPrecioRectificacionCRAMComponent } from './list/lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from './detail/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from './update/lista-precio-rectificacion-cram-update.component';
import { ListaPrecioRectificacionCRAMDeleteDialogComponent } from './delete/lista-precio-rectificacion-cram-delete-dialog.component';
import { ListaPrecioRectificacionCRAMRoutingModule } from './route/lista-precio-rectificacion-cram-routing.module';

@NgModule({
  imports: [SharedModule, ListaPrecioRectificacionCRAMRoutingModule],
  declarations: [
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMDetailComponent,
    ListaPrecioRectificacionCRAMUpdateComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
  ],
  entryComponents: [ListaPrecioRectificacionCRAMDeleteDialogComponent],
})
export class ListaPrecioRectificacionCRAMModule {}
