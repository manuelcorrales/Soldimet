import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoPresupuestoComponent } from './list/estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from './detail/estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from './update/estado-presupuesto-update.component';
import { EstadoPresupuestoDeleteDialogComponent } from './delete/estado-presupuesto-delete-dialog.component';
import { EstadoPresupuestoRoutingModule } from './route/estado-presupuesto-routing.module';

@NgModule({
  imports: [SharedModule, EstadoPresupuestoRoutingModule],
  declarations: [
    EstadoPresupuestoComponent,
    EstadoPresupuestoDetailComponent,
    EstadoPresupuestoUpdateComponent,
    EstadoPresupuestoDeleteDialogComponent,
  ],
  entryComponents: [EstadoPresupuestoDeleteDialogComponent],
})
export class EstadoPresupuestoModule {}
