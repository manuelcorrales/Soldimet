import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaComponent } from 'app/caja/caja.component';
import { CAJA_ROUTE } from 'app/caja/caja.route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SoldimetSharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [CommonModule, BrowserModule, SoldimetSharedModule, RouterModule.forRoot([CAJA_ROUTE], { useHash: true })],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [CajaComponent],
    entryComponents: [CajaComponent]
})
export class CajaModule {}
