import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { LocalidadComponent } from 'app/entities/localidad/localidad.component';
import { LocalidadDetailComponent } from 'app/entities/localidad/localidad-detail.component';
import { LocalidadUpdateComponent } from 'app/entities/localidad/localidad-update.component';
import { LocalidadDeletePopupComponent, LocalidadDeleteDialogComponent } from 'app/entities/localidad/localidad-delete-dialog.component';
import { localidadRoute, localidadPopupRoute } from 'app/entities/localidad/localidad.route';

const ENTITY_STATES = [...localidadRoute, ...localidadPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LocalidadComponent,
    LocalidadDetailComponent,
    LocalidadUpdateComponent,
    LocalidadDeleteDialogComponent,
    LocalidadDeletePopupComponent
  ],
  entryComponents: [LocalidadComponent, LocalidadUpdateComponent, LocalidadDeleteDialogComponent, LocalidadDeletePopupComponent]
})
export class SoldimetLocalidadModule {}
