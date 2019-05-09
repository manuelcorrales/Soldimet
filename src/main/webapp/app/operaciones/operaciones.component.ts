import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DTOListaPrecioManoDeObra } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { OperacionesService } from 'app/operaciones/operaciones-services';

@Component({
    selector: 'jhi-operaciones',
    templateUrl: './operaciones.component.html',
    styles: []
})
export class OperacionesComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;

    listas: DTOListaPrecioManoDeObra[] = [];
    constructor(private operacionesService: OperacionesService) {}

    ngOnInit() {
        this.operacionesService.getListasOperacionesAutorizadas().subscribe((listas: DTOListaPrecioManoDeObra[]) => {
            if (listas.length > 0) {
                this.listas = listas;
            }
        });
    }
}
