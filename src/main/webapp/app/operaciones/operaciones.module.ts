import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OperacionesComponent } from 'app/operaciones/operaciones.component';
import { OPERACIONES_ROUTE } from 'app/operaciones/operaciones.route';
import { RouterModule } from '@angular/router';
import { OperacionListaComponent } from 'app/operaciones/operacion-lista/operacion-lista.component';
import { OperacionesService } from 'app/operaciones/operaciones-services';
import { OperacionListaPrecioComponent } from 'app/operaciones/operacion-lista/operacion-lista-precio.component';

@NgModule({
    imports: [CommonModule, RouterModule.forRoot([OPERACIONES_ROUTE], { useHash: true })],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [OperacionesComponent, OperacionListaComponent, OperacionListaPrecioComponent],
    providers: [OperacionesService, DecimalPipe],
    entryComponents: [OperacionesComponent, OperacionListaComponent, OperacionListaPrecioComponent]
})
export class OperacionesModule {}
