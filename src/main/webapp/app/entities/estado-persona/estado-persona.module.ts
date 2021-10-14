import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoPersonaComponent } from './list/estado-persona.component';
import { EstadoPersonaDetailComponent } from './detail/estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from './update/estado-persona-update.component';
import { EstadoPersonaDeleteDialogComponent } from './delete/estado-persona-delete-dialog.component';
import { EstadoPersonaRoutingModule } from './route/estado-persona-routing.module';

@NgModule({
  imports: [SharedModule, EstadoPersonaRoutingModule],
  declarations: [EstadoPersonaComponent, EstadoPersonaDetailComponent, EstadoPersonaUpdateComponent, EstadoPersonaDeleteDialogComponent],
  entryComponents: [EstadoPersonaDeleteDialogComponent],
})
export class EstadoPersonaModule {}
