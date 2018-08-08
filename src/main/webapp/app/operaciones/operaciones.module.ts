import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperacionesComponent } from './operaciones.component';
import { OPERACIONES_ROUTE } from './operaciones.route';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule.forRoot([OPERACIONES_ROUTE], { useHash: true })],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [OperacionesComponent],
    entryComponents: [OperacionesComponent]
})
export class OperacionesModule {}
