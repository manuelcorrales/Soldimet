import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CostoRepuestoComponent } from './list/costo-repuesto.component';
import { CostoRepuestoDetailComponent } from './detail/costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from './update/costo-repuesto-update.component';
import { CostoRepuestoDeleteDialogComponent } from './delete/costo-repuesto-delete-dialog.component';
import { CostoRepuestoRoutingModule } from './route/costo-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, CostoRepuestoRoutingModule],
  declarations: [CostoRepuestoComponent, CostoRepuestoDetailComponent, CostoRepuestoUpdateComponent, CostoRepuestoDeleteDialogComponent],
  entryComponents: [CostoRepuestoDeleteDialogComponent],
})
export class CostoRepuestoModule {}
