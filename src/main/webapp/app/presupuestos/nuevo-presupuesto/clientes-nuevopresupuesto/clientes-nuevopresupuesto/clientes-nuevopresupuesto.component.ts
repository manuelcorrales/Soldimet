import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { ClienteService } from 'app/entities/cliente';
import { PersonaService } from 'app/entities/persona';
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
  elegirConClick = true;
  // abrir/cerrar el dropwdown al hacer click
  abrirDropEnclick = true;
  // cantidad de caracteres ingresados como mínimo al hacer la búsqueda
  cantidadCaracteresMinimos = 2;
  // numero en milisegundos de espera antes de realizar la búsqueda
  milisegundos = 100;
  // Auto elegir una coincidencia
  resaltarCoincidencia = false;
  // enfocar automaticamente cuando carga la página
  autofocus = true;
  // mensaje 'sin resultados'
  textNoResults = 'No se encontraron resultados';
  // texto durante la busqueda
  textSearching = 'buscando clientes...';
  // titulo
  titleField = 'Cliente';
  // limpiar lista de busqueda
  clearSelected = true;
  // controlando estado del buscador
  buscandoClientes = false;

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

  filtrarClientes(term: string, cliente: Cliente): boolean {
    const busqueda = term.toLowerCase();
    return cliente.apellido.toLowerCase().includes(busqueda) || cliente.persona.nombre.toLowerCase().includes(busqueda);
  }

  getCliente() {
    return this.clienteElegido;
  }
}
