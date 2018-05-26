import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Cliente } from "../../../../entities/cliente/cliente.model";
import { PresupuestosService } from "../../../presupuestos.service";
import { ClienteService } from '../../../../entities/cliente';
import { PersonaService, Persona } from '../../../../entities/persona';
import { ResponseWrapper } from '../../../../shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'jhi-clientes-nuevopresupuesto',
    templateUrl: './clientes-nuevopresupuesto.component.html',
    styles: []
})
export class ClientesNuevopresupuestoComponent implements OnInit {

    clientes: Cliente[] = [];
    clienteElegido: Cliente;
    // configuración autocompleter
    //Seleccionar el elemento al hacer click sobre la sugerencia
    protected elegirConClick: boolean = true;
    //abrir/cerrar el dropwdown al hacer click
    protected abrirDropEnclick: boolean = true;
    //cantidad de caracteres ingresados como mínimo al hacer la búsqueda
    protected cantidadCaracteresMinimos: number = 2;
    //numero en milisegundos de espera antes de realizar la búsqueda
    protected milisegundos: number = 100;
    //Auto elegir una coincidencia
    protected resaltarCoincidencia: boolean = false;//recomendado
    // enfocar automaticamente cuando carga la página
    protected autofocus: boolean = true;
    // mensaje 'sin resultados'
    protected textNoResults: string = "No se encontraron resultados";
    // texto durante la busqueda
    protected textSearching: string = "buscando clientes...";
    // titulo
    protected titleField: string = "Cliente";
    // limpiar lista de busqueda
    protected clearSelected: boolean = true;
    //controlando estado del buscador
    protected buscandoClientes: boolean = false;


    constructor(private _presupuestosService: PresupuestosService,
        //private completerService: CompleterService,
        private _clienteService: ClienteService,
        private _personaService: PersonaService,
    ) {
    }

    ngOnInit() {
        this.buscarTodoscliente();
    }

    buscarTodoscliente() {
        this.buscandoClientes = true;
        this._presupuestosService.findAllClientes().subscribe(
            (res: Cliente[]) => {
                this.buscandoClientes = false,
                this.clientes = [...res];
            },
        );
    }

    filtrarClientes(term: string, item: any): boolean{
        console.log(term)
        console.log(item)
        return (item.appelido.match(term) || item.persona.nombre.match(term))
    }


}
