import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoRepuestoComponent } from './list/tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from './detail/tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from './update/tipo-repuesto-update.component';
import { TipoRepuestoDeleteDialogComponent } from './delete/tipo-repuesto-delete-dialog.component';
import { TipoRepuestoRoutingModule } from './route/tipo-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, TipoRepuestoRoutingModule],
  declarations: [TipoRepuestoComponent, TipoRepuestoDetailComponent, TipoRepuestoUpdateComponent, TipoRepuestoDeleteDialogComponent],
  entryComponents: [TipoRepuestoDeleteDialogComponent],
})
export class TipoRepuestoModule {}
