import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoCostoRepuestoComponent } from './list/estado-costo-repuesto.component';
import { EstadoCostoRepuestoDetailComponent } from './detail/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuestoUpdateComponent } from './update/estado-costo-repuesto-update.component';
import { EstadoCostoRepuestoDeleteDialogComponent } from './delete/estado-costo-repuesto-delete-dialog.component';
import { EstadoCostoRepuestoRoutingModule } from './route/estado-costo-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, EstadoCostoRepuestoRoutingModule],
  declarations: [
    EstadoCostoRepuestoComponent,
    EstadoCostoRepuestoDetailComponent,
    EstadoCostoRepuestoUpdateComponent,
    EstadoCostoRepuestoDeleteDialogComponent,
  ],
  entryComponents: [EstadoCostoRepuestoDeleteDialogComponent],
})
export class EstadoCostoRepuestoModule {}
