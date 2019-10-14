import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CilindradaComponent } from './cilindrada.component';
import { CilindradaDetailComponent } from './cilindrada-detail.component';
import { CilindradaUpdateComponent } from './cilindrada-update.component';
import { CilindradaDeletePopupComponent, CilindradaDeleteDialogComponent } from './cilindrada-delete-dialog.component';
import { cilindradaRoute, cilindradaPopupRoute } from './cilindrada.route';

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
