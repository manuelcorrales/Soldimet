import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CajaComponent } from 'app/caja/caja.component';
import { CAJAS_ROUTE, CAJA_POPUP_ROUTES } from 'app/caja/caja.route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { NuevoMovimientoComponent } from 'app/caja/nuevo-movimiento/nuevo-movimiento.component';
import { BorrarMovimientoDialogComponent, BorrarMovimientoPopupComponent } from 'app/caja/borrar-movimiento/borrar-movimiento.component';
import { BorrarMovimientoPopupService } from 'app/caja/borrar-movimiento/borrar-movimiento-popup.service';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';

const CAJAS_ROUTES_ALL = [...CAJAS_ROUTE, ...CAJA_POPUP_ROUTES];

@NgModule({
  imports: [FormsModule, CommonModule, BrowserModule, SoldimetSharedModule, RouterModule.forRoot(CAJAS_ROUTES_ALL, { useHash: true })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CajaComponent, NuevoMovimientoComponent, BorrarMovimientoDialogComponent, BorrarMovimientoPopupComponent],
  entryComponents: [CajaComponent, NuevoMovimientoComponent, BorrarMovimientoDialogComponent, BorrarMovimientoPopupComponent],
  providers: [BorrarMovimientoPopupService, CajaModuleServiceService]
})
export class CajaModule {}
