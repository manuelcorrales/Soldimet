import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CostoOperacionComponent } from './list/costo-operacion.component';
import { CostoOperacionDetailComponent } from './detail/costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from './update/costo-operacion-update.component';
import { CostoOperacionDeleteDialogComponent } from './delete/costo-operacion-delete-dialog.component';
import { CostoOperacionRoutingModule } from './route/costo-operacion-routing.module';

@NgModule({
  imports: [SharedModule, CostoOperacionRoutingModule],
  declarations: [
    CostoOperacionComponent,
    CostoOperacionDetailComponent,
    CostoOperacionUpdateComponent,
    CostoOperacionDeleteDialogComponent,
  ],
  entryComponents: [CostoOperacionDeleteDialogComponent],
})
export class CostoOperacionModule {}
