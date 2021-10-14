import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoCobranzaOperacionComponent } from './list/estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from './detail/estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from './update/estado-cobranza-operacion-update.component';
import { EstadoCobranzaOperacionDeleteDialogComponent } from './delete/estado-cobranza-operacion-delete-dialog.component';
import { EstadoCobranzaOperacionRoutingModule } from './route/estado-cobranza-operacion-routing.module';

@NgModule({
  imports: [SharedModule, EstadoCobranzaOperacionRoutingModule],
  declarations: [
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionDetailComponent,
    EstadoCobranzaOperacionUpdateComponent,
    EstadoCobranzaOperacionDeleteDialogComponent,
  ],
  entryComponents: [EstadoCobranzaOperacionDeleteDialogComponent],
})
export class EstadoCobranzaOperacionModule {}
