import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Cliente} from "../../../../entities/cliente/cliente.model";
import {PresupuestosService} from "../../../presupuestos.service";

@Component({
    selector: 'jhi-clientes-nuevopresupuesto',
    templateUrl: './clientes-nuevopresupuesto.component.html',
    styles: []
})
export class ClientesNuevopresupuestoComponent implements OnInit {

    clientes: Cliente[] = [];

    cliente: Cliente;

    @Output() eventoElegirCliente = new EventEmitter<Cliente>();

    constructor(private _presupuestosService: PresupuestosService) {
    }

    ngOnInit() {

    }

    elegirCliente() {
        this.eventoElegirCliente.emit(this.cliente);
    }

}
