import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AplicacionComponent } from './list/aplicacion.component';
import { AplicacionDetailComponent } from './detail/aplicacion-detail.component';
import { AplicacionUpdateComponent } from './update/aplicacion-update.component';
import { AplicacionDeleteDialogComponent } from './delete/aplicacion-delete-dialog.component';
import { AplicacionRoutingModule } from './route/aplicacion-routing.module';

@NgModule({
  imports: [SharedModule, AplicacionRoutingModule],
  declarations: [AplicacionComponent, AplicacionDetailComponent, AplicacionUpdateComponent, AplicacionDeleteDialogComponent],
  entryComponents: [AplicacionDeleteDialogComponent],
})
export class AplicacionModule {}
