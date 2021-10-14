import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BancoComponent } from './list/banco.component';
import { BancoDetailComponent } from './detail/banco-detail.component';
import { BancoUpdateComponent } from './update/banco-update.component';
import { BancoDeleteDialogComponent } from './delete/banco-delete-dialog.component';
import { BancoRoutingModule } from './route/banco-routing.module';

@NgModule({
  imports: [SharedModule, BancoRoutingModule],
  declarations: [BancoComponent, BancoDetailComponent, BancoUpdateComponent, BancoDeleteDialogComponent],
  entryComponents: [BancoDeleteDialogComponent],
})
export class BancoModule {}
