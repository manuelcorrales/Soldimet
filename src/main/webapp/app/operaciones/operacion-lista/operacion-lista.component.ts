import { Component, OnInit, Input } from '@angular/core';
import { DTOListaPrecioManoDeObraComponent } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';

@Component({
    selector: 'jhi-operacion-lista',
    templateUrl: './operacion-lista.component.html',
    styles: []
})
export class OperacionListaComponent implements OnInit {
    @Input() lista: DTOListaPrecioManoDeObraComponent;

    constructor() {}

    ngOnInit() {}

    getListaOperaciones(): DTOListaPrecioManoDeObraComponent {
        return this.lista;
    }
}
