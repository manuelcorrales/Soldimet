import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoCobranzaOperacionComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-update.component';
import {
  EstadoCobranzaOperacionDeletePopupComponent,
  EstadoCobranzaOperacionDeleteDialogComponent
} from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-delete-dialog.component';
import {
  estadoCobranzaOperacionRoute,
  estadoCobranzaOperacionPopupRoute
} from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.route';

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
