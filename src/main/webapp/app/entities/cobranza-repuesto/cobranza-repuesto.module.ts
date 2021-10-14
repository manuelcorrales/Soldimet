import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CobranzaRepuestoComponent } from './list/cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from './detail/cobranza-repuesto-detail.component';
import { CobranzaRepuestoUpdateComponent } from './update/cobranza-repuesto-update.component';
import { CobranzaRepuestoDeleteDialogComponent } from './delete/cobranza-repuesto-delete-dialog.component';
import { CobranzaRepuestoRoutingModule } from './route/cobranza-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, CobranzaRepuestoRoutingModule],
  declarations: [
    CobranzaRepuestoComponent,
    CobranzaRepuestoDetailComponent,
    CobranzaRepuestoUpdateComponent,
    CobranzaRepuestoDeleteDialogComponent,
  ],
  entryComponents: [CobranzaRepuestoDeleteDialogComponent],
})
export class CobranzaRepuestoModule {}
