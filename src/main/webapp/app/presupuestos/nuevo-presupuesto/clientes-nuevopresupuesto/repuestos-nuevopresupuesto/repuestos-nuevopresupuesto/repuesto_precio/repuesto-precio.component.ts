import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { Articulo } from 'app/shared/model/articulo.model';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-repuesto-precio',
  templateUrl: './repuesto-precio.component.html',
  styles: []
})
export class RepuestoPrecioComponent implements OnInit {
  @Input() repuesto: TipoRepuesto;
  @Input() cobranzaUltimoRepuesto: CobranzaRepuesto;
  @Input() listaCobranzas: CostoRepuestoProveedor[];
  @Input() articulos: Articulo[];

  articulo: Articulo;

  seleccionado = false;
  precio = 0;
  precioAnterior = 0;
  @Output() eventoCambioValor = new EventEmitter<number>();

  @ViewChild('instanceNTAArticulo', { static: false })
  instanceArticulo: NgbTypeahead;
  focusArticulo$ = new Subject<string>();
  clickArticulo$ = new Subject<string>();

  constructor() {}

  formatterArticulo = (articulo: Articulo) => `${articulo.marca.nombreMarca} (${articulo.codigoArticuloProveedor})`;
  searchArticulo = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickArticulo$.pipe(filter(() => !this.instanceArticulo.isPopupOpen()));
    const inputFocus$ = this.focusArticulo$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.listaCobranzas.filter(cobranza => cobranza.articulo != null).map(cobranza => cobranza.articulo)
          : // es-lint-ignore-next-line prefer-includes
            this.articulos.filter(
              v =>
                v.codigoArticuloProveedor.toLowerCase().includes(term.toLowerCase()) ||
                v.marca.nombreMarca.toLowerCase().includes(term.toLowerCase())
            )
        ).slice(0, 10)
      )
    );
  };

  ngOnInit() {
    // La lista del autocompletar viene de la lista de ya enlazados con este tipo repuesto y de todos los articulos
    // De esta forma parecen selectores con los articulos que ya eligio
    // y ademas puedo filtrar y seleccionar un articulo nuevo a este tipo repuesto (al momento de guardar el presupuesto)
    if (this.listaCobranzas.length > 0) {
      this.articulo = this.listaCobranzas[0].articulo;
      this.actualizarPrecio(this.articulo.valor);
    }

    // Preseleccionar si existe un presupuesto anterior
    if (this.cobranzaUltimoRepuesto) {
      this.seleccionado = true;
      this.articulo = this.cobranzaUltimoRepuesto.articulo;
      this.actualizarPrecio(this.cobranzaUltimoRepuesto.valor);
    }
  }

  actualizarPrecio(precio) {
    this.precio = precio;
    setTimeout(() => this.cambioValor(), 1000);
  }

  marcado() {
    return this.seleccionado;
  }

  getArticuloAcobrar(): CobranzaRepuesto {
    const nuevaCobranzaRepuesto = new CobranzaRepuesto();
    nuevaCobranzaRepuesto.valor = this.precio;
    nuevaCobranzaRepuesto.tipoRepuesto = this.repuesto;
    nuevaCobranzaRepuesto.articulo = this.articulo;
    return nuevaCobranzaRepuesto;
  }

  cambioValor() {
    this.eventoCambioValor.emit();
  }

  getPrecio() {
    if (this.seleccionado) {
      return this.precio;
    } else {
      return 0;
    }
  }

  pisarPrecioConArticulo(event: NgbTypeaheadSelectItemEvent) {
    this.precio = event.item.valor;
  }
}
