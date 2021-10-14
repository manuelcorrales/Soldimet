import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrecioRepuestoComponent } from './list/precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from './detail/precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from './update/precio-repuesto-update.component';
import { PrecioRepuestoDeleteDialogComponent } from './delete/precio-repuesto-delete-dialog.component';
import { PrecioRepuestoRoutingModule } from './route/precio-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, PrecioRepuestoRoutingModule],
  declarations: [
    PrecioRepuestoComponent,
    PrecioRepuestoDetailComponent,
    PrecioRepuestoUpdateComponent,
    PrecioRepuestoDeleteDialogComponent,
  ],
  entryComponents: [PrecioRepuestoDeleteDialogComponent],
})
export class PrecioRepuestoModule {}
