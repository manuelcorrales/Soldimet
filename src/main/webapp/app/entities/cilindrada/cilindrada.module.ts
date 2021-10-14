import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CilindradaComponent } from './list/cilindrada.component';
import { CilindradaDetailComponent } from './detail/cilindrada-detail.component';
import { CilindradaUpdateComponent } from './update/cilindrada-update.component';
import { CilindradaDeleteDialogComponent } from './delete/cilindrada-delete-dialog.component';
import { CilindradaRoutingModule } from './route/cilindrada-routing.module';

@NgModule({
  imports: [SharedModule, CilindradaRoutingModule],
  declarations: [CilindradaComponent, CilindradaDetailComponent, CilindradaUpdateComponent, CilindradaDeleteDialogComponent],
  entryComponents: [CilindradaDeleteDialogComponent],
})
export class CilindradaModule {}
