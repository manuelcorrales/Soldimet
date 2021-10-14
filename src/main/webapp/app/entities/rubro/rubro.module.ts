import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RubroComponent } from './list/rubro.component';
import { RubroDetailComponent } from './detail/rubro-detail.component';
import { RubroUpdateComponent } from './update/rubro-update.component';
import { RubroDeleteDialogComponent } from './delete/rubro-delete-dialog.component';
import { RubroRoutingModule } from './route/rubro-routing.module';

@NgModule({
  imports: [SharedModule, RubroRoutingModule],
  declarations: [RubroComponent, RubroDetailComponent, RubroUpdateComponent, RubroDeleteDialogComponent],
  entryComponents: [RubroDeleteDialogComponent],
})
export class RubroModule {}
