import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HistorialPrecioComponent } from './list/historial-precio.component';
import { HistorialPrecioDetailComponent } from './detail/historial-precio-detail.component';
import { HistorialPrecioUpdateComponent } from './update/historial-precio-update.component';
import { HistorialPrecioDeleteDialogComponent } from './delete/historial-precio-delete-dialog.component';
import { HistorialPrecioRoutingModule } from './route/historial-precio-routing.module';

@NgModule({
  imports: [SharedModule, HistorialPrecioRoutingModule],
  declarations: [
    HistorialPrecioComponent,
    HistorialPrecioDetailComponent,
    HistorialPrecioUpdateComponent,
    HistorialPrecioDeleteDialogComponent,
  ],
  entryComponents: [HistorialPrecioDeleteDialogComponent],
})
export class HistorialPrecioModule {}
