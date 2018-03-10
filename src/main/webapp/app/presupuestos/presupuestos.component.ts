import {Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {PresupuestoService} from "../entities/presupuesto/presupuesto.service";
import {DataTableDirective} from 'angular-datatables';
import {Page} from "../dto/page/Page";
import {ITEMS_PER_PAGE} from "../shared/constants/pagination.constants";
import {FILTRO_PRESUPUESTO} from "../shared/constants/filter.constants";
import {DT_OPTIONS} from "../shared/constants/datatable.configuration";
import {Subject} from "rxjs/Subject";
import {DtoPresupuestoCabeceraComponent} from "../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component";

@Component({
    selector: 'jhi-presupuestos',
    templateUrl: './presupuestos.component.html',
    styles: []
})
export class PresupuestosComponent implements OnInit {

    @ViewChild('toastr', {read: ViewContainerRef}) toastrContainer: ViewContainerRef;
    @ViewChild(DataTableDirective)
    @Output() contarCheck = new EventEmitter<number>();

    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger = new Subject();

    limit = ITEMS_PER_PAGE;
    page = new Page();
    presupuestos: DtoPresupuestoCabeceraComponent[] = [];


    constructor(private _presupuestoService: PresupuestoService) {
    }

    ngOnInit() {
        this.dtOptions = DT_OPTIONS;

        //this.llamarConFiltro(0);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        if (val.length > 2) {
            // cambio el filtro del paginado
            this.page.filter = this.filtrarPorCadena(val);
            //vuelvo a llamar
            this.llamarConFiltro(0);

        }
    }

    setPage(pageInfo) {
        this.llamarConFiltro(pageInfo.offset);
    }

    llamarConFiltro(numeroPagina: number) {
        this._presupuestoService.query(this.page).subscribe(pagedData => {
            this.page.pageNumber = numeroPagina;
            //this.rows = pagedData.json.data;
        });
    }

    filtrarPorCadena(cadena: string): string[] {

        var filtros: string[] = [];
        for (const nombreFiltro in FILTRO_PRESUPUESTO) {
            filtros.push(nombreFiltro + cadena);
        }
        return filtros;
    }
}
