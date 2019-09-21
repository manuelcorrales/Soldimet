import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoCobranzaOperacionComponent } from './estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from './estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from './estado-cobranza-operacion-update.component';
import {
  EstadoCobranzaOperacionDeletePopupComponent,
  EstadoCobranzaOperacionDeleteDialogComponent
} from './estado-cobranza-operacion-delete-dialog.component';
import { estadoCobranzaOperacionRoute, estadoCobranzaOperacionPopupRoute } from './estado-cobranza-operacion.route';

const ENTITY_STATES = [...estadoCobranzaOperacionRoute, ...estadoCobranzaOperacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionDetailComponent,
    EstadoCobranzaOperacionUpdateComponent,
    EstadoCobranzaOperacionDeleteDialogComponent,
    EstadoCobranzaOperacionDeletePopupComponent
  ],
  entryComponents: [
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionUpdateComponent,
    EstadoCobranzaOperacionDeleteDialogComponent,
    EstadoCobranzaOperacionDeletePopupComponent
  ]
})
export class SoldimetEstadoCobranzaOperacionModule {}
