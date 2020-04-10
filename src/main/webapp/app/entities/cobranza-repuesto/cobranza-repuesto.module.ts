import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CobranzaRepuestoComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto-detail.component';
import { CobranzaRepuestoUpdateComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto-update.component';
import {
  CobranzaRepuestoDeletePopupComponent,
  CobranzaRepuestoDeleteDialogComponent
} from 'app/entities/cobranza-repuesto/cobranza-repuesto-delete-dialog.component';
import { cobranzaRepuestoRoute, cobranzaRepuestoPopupRoute } from 'app/entities/cobranza-repuesto/cobranza-repuesto.route';

const ENTITY_STATES = [...cobranzaRepuestoRoute, ...cobranzaRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CobranzaRepuestoComponent,
    CobranzaRepuestoDetailComponent,
    CobranzaRepuestoUpdateComponent,
    CobranzaRepuestoDeleteDialogComponent,
    CobranzaRepuestoDeletePopupComponent
  ],
  entryComponents: [
    CobranzaRepuestoComponent,
    CobranzaRepuestoUpdateComponent,
    CobranzaRepuestoDeleteDialogComponent,
    CobranzaRepuestoDeletePopupComponent
  ]
})
export class SoldimetCobranzaRepuestoModule {}
