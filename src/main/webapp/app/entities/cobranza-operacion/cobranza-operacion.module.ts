import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CobranzaOperacionComponent } from './list/cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from './detail/cobranza-operacion-detail.component';
import { CobranzaOperacionUpdateComponent } from './update/cobranza-operacion-update.component';
import { CobranzaOperacionDeleteDialogComponent } from './delete/cobranza-operacion-delete-dialog.component';
import { CobranzaOperacionRoutingModule } from './route/cobranza-operacion-routing.module';

@NgModule({
  imports: [SharedModule, CobranzaOperacionRoutingModule],
  declarations: [
    CobranzaOperacionComponent,
    CobranzaOperacionDetailComponent,
    CobranzaOperacionUpdateComponent,
    CobranzaOperacionDeleteDialogComponent,
  ],
  entryComponents: [CobranzaOperacionDeleteDialogComponent],
})
export class CobranzaOperacionModule {}
