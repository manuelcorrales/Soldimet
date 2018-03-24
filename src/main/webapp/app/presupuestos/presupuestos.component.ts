import {Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {PresupuestoService} from "../entities/presupuesto/presupuesto.service";
import {Page} from "../dto/page/Page";
import {ITEMS_PER_PAGE} from "../shared/constants/pagination.constants";
import {FILTRO_PRESUPUESTO} from "../shared/constants/filter.constants";
import {DT_OPTIONS} from "../shared/constants/datatable.configuration";
import {Subject} from "rxjs/Subject";
import {DtoPresupuestoCabeceraComponent} from "../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component";
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { PresupuestosService } from './presupuestos.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-presupuestos',
    templateUrl: './presupuestos.component.html',
    styles: []
})
export class PresupuestosComponent implements OnInit {

    @ViewChild('toastr', {read: ViewContainerRef}) toastrContainer: ViewContainerRef;
    @Output() contarCheck = new EventEmitter<number>();

    dtOptions: any = {};
    dtTrigger = new Subject();

    limit = ITEMS_PER_PAGE;
    page = new Page();
    presupuestos: DtoPresupuestoCabeceraComponent[] = [];

    settings = {
        sort: true,
        noDataMessage: 'No se encontraron presupuestos para mostrar',
        actions:{
            add: false
        },
        pager:{
            perPage: 25
        },

        delete: {
            confirmDelete: true,
          },
          add: {
            confirmCreate: true,
          },
          edit: {
            confirmSave: true,
         },
        columns: {
            codigo: {
            title: 'Número'
          },
          motor: {
            title: 'Motor'
          },
          cliente: {
              title: 'cliente'
          },
          importe: {
            title: 'Importe'
          },
          fecha: {
            title: 'Fecha',
            valuePrepareFunction: (date) => {
                var raw = new Date(date);

                var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
                return formatted;
              }
          },
          estado: {
              title: 'Estado'
          },
          sucursal: {
              title: 'Sucursal'
          }

        }
      };

      source: LocalDataSource; // add a property to the component

    constructor(private _presupuestoService: PresupuestoService,
                private _presupuestosService: PresupuestosService,
                private datePipe: DatePipe) {
        this.source = new LocalDataSource(); // create the source
    }


    ngOnInit() {
        this._presupuestosService.findPresupuestoCabecera().subscribe((presupuestos)=>{
            this.source = new LocalDataSource(presupuestos);
        })
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
