import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CilindradaComponent } from 'app/entities/cilindrada/cilindrada.component';
import { CilindradaDetailComponent } from 'app/entities/cilindrada/cilindrada-detail.component';
import { CilindradaUpdateComponent } from 'app/entities/cilindrada/cilindrada-update.component';
import {
  CilindradaDeletePopupComponent,
  CilindradaDeleteDialogComponent
} from 'app/entities/cilindrada/cilindrada-delete-dialog.component';
import { cilindradaRoute, cilindradaPopupRoute } from 'app/entities/cilindrada/cilindrada.route';

const ENTITY_STATES = [...cilindradaRoute, ...cilindradaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CilindradaComponent,
    CilindradaDetailComponent,
    CilindradaUpdateComponent,
    CilindradaDeleteDialogComponent,
    CilindradaDeletePopupComponent
  ],
  entryComponents: [CilindradaComponent, CilindradaUpdateComponent, CilindradaDeleteDialogComponent, CilindradaDeletePopupComponent]
})
export class SoldimetCilindradaModule {}
