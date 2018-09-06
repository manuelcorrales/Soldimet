import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { DTOListaPrecioManoDeObraComponent } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { OperacionListaPrecioComponent } from 'app/operaciones/operacion-lista/operacion-lista-precio.component';
import { OperacionesService } from 'app/operaciones/operaciones-services';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-operacion-lista',
    templateUrl: './operacion-lista.component.html',
    styles: []
})
export class OperacionListaComponent implements OnInit {
    @Input() lista: DTOListaPrecioManoDeObraComponent;
    @ViewChildren('costosOperaciones') children: QueryList<OperacionListaPrecioComponent>;

    constructor(
        private _operacionesService: OperacionesService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {}

    getListaOperaciones(): DTOListaPrecioManoDeObraComponent {
        return this.lista;
    }

    modificarPorcentageLista(porcentage: number) {
        this.children.forEach(child => {
            child.modificarPrecio(porcentage);
        });
    }

    guardarLista() {
        this._operacionesService.saveListaActualizada(this.lista).subscribe(listaNueva => {
            this.lista = listaNueva;
            this.jhiAlertService.success('Se actualizó la lista número:' + listaNueva.numeroLista, null, null);
        });
    }
}
