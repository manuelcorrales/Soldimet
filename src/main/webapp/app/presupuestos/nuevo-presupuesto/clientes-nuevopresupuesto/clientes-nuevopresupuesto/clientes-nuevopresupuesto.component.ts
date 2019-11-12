import { Component, OnInit, ViewChild } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { ClienteService } from 'app/entities/cliente';
import { PersonaService } from 'app/entities/persona';
import { Cliente } from 'app/shared/model/cliente.model';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'jhi-clientes-nuevopresupuesto',
  templateUrl: './clientes-nuevopresupuesto.component.html',
  styles: []
})
export class ClientesNuevopresupuestoComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteElegido: Cliente;

  @ViewChild('instanceNTACli', { static: false })
  instanceCli: NgbTypeahead;
  focusCli$ = new Subject<string>();
  clickCli$ = new Subject<string>();

  constructor(
    private _presupuestosService: PresupuestosService,
    private _clienteService: ClienteService,
    private _personaService: PersonaService
  ) {}

  ngOnInit() {
    this.buscarTodoscliente();
  }

  buscarTodoscliente() {
    this._presupuestosService.findAllActiveClientes().subscribe((res: Cliente[]) => {
      this.clientes = [...res];
    });
  }

  formatterCli = (result: Cliente) => result.persona.nombre + ' ' + result.persona.apellido;
  searchCli = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickCli$.pipe(filter(() => !this.instanceCli.isPopupOpen()));
    const inputFocus$ = this.focusCli$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.clientes
          : this.clientes.filter(v => {
              v.persona.nombre.toLowerCase().includes(term.toLowerCase()) || v.persona.apellido.toLowerCase().includes(term.toLowerCase());
            })
        )
          .slice(0, 10)
          .sort(this._sortCliente)
      )
    );
  };

  _sortCliente(a: Cliente, b: Cliente) {
    if (a.persona.nombre < b.persona.nombre) {
      return 1;
    }
    if (a.persona.nombre > b.persona.nombre) {
      return -1;
    }
    return 0;
  }

  getCliente() {
    return this.clienteElegido;
  }
}
