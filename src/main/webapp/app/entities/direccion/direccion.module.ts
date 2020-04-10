import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DireccionComponent } from 'app/entities/direccion/direccion.component';
import { DireccionDetailComponent } from 'app/entities/direccion/direccion-detail.component';
import { DireccionUpdateComponent } from 'app/entities/direccion/direccion-update.component';
import { DireccionDeletePopupComponent, DireccionDeleteDialogComponent } from 'app/entities/direccion/direccion-delete-dialog.component';
import { direccionRoute, direccionPopupRoute } from 'app/entities/direccion/direccion.route';

const ENTITY_STATES = [...direccionRoute, ...direccionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DireccionComponent,
    DireccionDetailComponent,
    DireccionUpdateComponent,
    DireccionDeleteDialogComponent,
    DireccionDeletePopupComponent
  ],
  entryComponents: [DireccionComponent, DireccionUpdateComponent, DireccionDeleteDialogComponent, DireccionDeletePopupComponent]
})
export class SoldimetDireccionModule {}
