import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepuestosComponent } from 'app/repuestos/repuestos.component';
import { REPUESTOS_ROUTE } from 'app/repuestos/repuestos.route';
import { RouterModule } from '@angular/router';
import { RepuestosService } from 'app/repuestos/repuestos-services';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloNuevoComponent } from './articulo-lista/articulo-nuevo.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgbTabsetModule, SoldimetSharedModule, RouterModule.forRoot([REPUESTOS_ROUTE], { useHash: true })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RepuestosComponent, ArticuloNuevoComponent],
  providers: [RepuestosService, DecimalPipe],
  entryComponents: [RepuestosComponent]
})
export class RepuestosModule {}
