import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoOperacionComponent } from './list/estado-operacion.component';
import { EstadoOperacionDetailComponent } from './detail/estado-operacion-detail.component';
import { EstadoOperacionUpdateComponent } from './update/estado-operacion-update.component';
import { EstadoOperacionDeleteDialogComponent } from './delete/estado-operacion-delete-dialog.component';
import { EstadoOperacionRoutingModule } from './route/estado-operacion-routing.module';

@NgModule({
  imports: [SharedModule, EstadoOperacionRoutingModule],
  declarations: [
    EstadoOperacionComponent,
    EstadoOperacionDetailComponent,
    EstadoOperacionUpdateComponent,
    EstadoOperacionDeleteDialogComponent,
  ],
  entryComponents: [EstadoOperacionDeleteDialogComponent],
})
export class EstadoOperacionModule {}
