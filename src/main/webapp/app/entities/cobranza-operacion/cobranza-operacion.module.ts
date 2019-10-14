import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CobranzaOperacionComponent } from './cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from './cobranza-operacion-detail.component';
import { CobranzaOperacionUpdateComponent } from './cobranza-operacion-update.component';
import {
  CobranzaOperacionDeletePopupComponent,
  CobranzaOperacionDeleteDialogComponent
} from './cobranza-operacion-delete-dialog.component';
import { cobranzaOperacionRoute, cobranzaOperacionPopupRoute } from './cobranza-operacion.route';

const ENTITY_STATES = [...cobranzaOperacionRoute, ...cobranzaOperacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CobranzaOperacionComponent,
    CobranzaOperacionDetailComponent,
    CobranzaOperacionUpdateComponent,
    CobranzaOperacionDeleteDialogComponent,
    CobranzaOperacionDeletePopupComponent
  ],
  entryComponents: [
    CobranzaOperacionComponent,
    CobranzaOperacionUpdateComponent,
    CobranzaOperacionDeleteDialogComponent,
    CobranzaOperacionDeletePopupComponent
  ]
})
export class SoldimetCobranzaOperacionModule {}
