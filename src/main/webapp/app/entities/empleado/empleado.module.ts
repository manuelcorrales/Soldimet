import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EmpleadoComponent } from 'app/entities/empleado/empleado.component';
import { EmpleadoDetailComponent } from 'app/entities/empleado/empleado-detail.component';
import { EmpleadoUpdateComponent } from 'app/entities/empleado/empleado-update.component';
import { EmpleadoDeletePopupComponent, EmpleadoDeleteDialogComponent } from 'app/entities/empleado/empleado-delete-dialog.component';
import { empleadoRoute, empleadoPopupRoute } from 'app/entities/empleado/empleado.route';

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
