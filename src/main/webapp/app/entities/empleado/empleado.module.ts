import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoUpdateComponent } from './empleado-update.component';
import { EmpleadoDeletePopupComponent, EmpleadoDeleteDialogComponent } from './empleado-delete-dialog.component';
import { empleadoRoute, empleadoPopupRoute } from './empleado.route';

const ENTITY_STATES = [...empleadoRoute, ...empleadoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmpleadoComponent,
    EmpleadoDetailComponent,
    EmpleadoUpdateComponent,
    EmpleadoDeleteDialogComponent,
    EmpleadoDeletePopupComponent
  ],
  entryComponents: [EmpleadoComponent, EmpleadoUpdateComponent, EmpleadoDeleteDialogComponent, EmpleadoDeletePopupComponent]
})
export class SoldimetEmpleadoModule {}
