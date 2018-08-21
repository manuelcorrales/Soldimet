import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { PresupuestosService } from '../../../presupuestos.service';
import { ClienteService } from '../../../../entities/cliente';
import { PersonaService } from '../../../../entities/persona';
import { FormsModule } from '@angular/forms';
import { Cliente } from 'app/shared/model/cliente.model';

@Component({
    selector: 'jhi-clientes-nuevopresupuesto',
    templateUrl: './clientes-nuevopresupuesto.component.html',
    styles: []
})
export class ClientesNuevopresupuestoComponent implements OnInit {
    clientes: Cliente[] = [];
    clienteElegido: Cliente;
    // configuración autocompleter
    // Seleccionar el elemento al hacer click sobre la sugerencia
    protected elegirConClick = true;
    // abrir/cerrar el dropwdown al hacer click
    protected abrirDropEnclick = true;
    // cantidad de caracteres ingresados como mínimo al hacer la búsqueda
    protected cantidadCaracteresMinimos = 2;
    // numero en milisegundos de espera antes de realizar la búsqueda
    protected milisegundos = 100;
    // Auto elegir una coincidencia
    protected resaltarCoincidencia = false;
    // enfocar automaticamente cuando carga la página
    protected autofocus = true;
    // mensaje 'sin resultados'
    protected textNoResults = 'No se encontraron resultados';
    // texto durante la busqueda
    protected textSearching = 'buscando clientes...';
    // titulo
    protected titleField = 'Cliente';
    // limpiar lista de busqueda
    protected clearSelected = true;
    // controlando estado del buscador
    protected buscandoClientes = false;

    constructor(
        private _presupuestosService: PresupuestosService,
        private _clienteService: ClienteService,
        private _personaService: PersonaService
    ) {}

    ngOnInit() {
        this.buscarTodoscliente();
    }

    buscarTodoscliente() {
        this.buscandoClientes = true;
        this._presupuestosService.findAllActiveClientes().subscribe((res: Cliente[]) => {
            (this.buscandoClientes = false), (this.clientes = [...res]);
        });
    }

    filtrarClientes(term: string, item: any): boolean {
        console.log(term);
        console.log(item);
        return item.appelido.match(term) || item.persona.nombre.match(term);
    }

    getCliente() {
        return this.clienteElegido;
    }
}
