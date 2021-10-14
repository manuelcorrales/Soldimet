import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoArticuloComponent } from './list/estado-articulo.component';
import { EstadoArticuloDetailComponent } from './detail/estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from './update/estado-articulo-update.component';
import { EstadoArticuloDeleteDialogComponent } from './delete/estado-articulo-delete-dialog.component';
import { EstadoArticuloRoutingModule } from './route/estado-articulo-routing.module';

@NgModule({
  imports: [SharedModule, EstadoArticuloRoutingModule],
  declarations: [
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloUpdateComponent,
    EstadoArticuloDeleteDialogComponent,
  ],
  entryComponents: [EstadoArticuloDeleteDialogComponent],
})
export class EstadoArticuloModule {}
