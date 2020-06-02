import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { Marca } from 'app/shared/model/marca.model';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'jhi-repuesto-precio',
  templateUrl: './repuesto-precio.component.html',
  styles: []
})
export class RepuestoPrecioComponent implements OnInit {
  @Input() repuesto: TipoRepuesto;
  @Input() cobranzaUltimoRepuesto: CobranzaRepuesto;
  @Input() listaCobranzas: CobranzaRepuesto[];

  marcas: Marca[];

  seleccionado = false;
  precio = 0;
  precioAnterior = 0;
  marca: Marca = new Marca();
  descripcion: string;
  @Output() eventoCambioValor = new EventEmitter<number>();

  @ViewChild('instanceNTAMarca', { static: false })
  instanceMarca: NgbTypeahead;
  focusMarca$ = new Subject<string>();
  clickMarca$ = new Subject<string>();

  constructor() {}

  ngOnInit() {
    // Precargar con las marcas el desplegable
    this.marcas = this.listaCobranzas.map(cobranza => cobranza.marca);

    // Preseleccionar si existe un presupuesto anterior
    if (this.cobranzaUltimoRepuesto) {
      this.marca = this.cobranzaUltimoRepuesto.marca;
      this.seleccionado = true;
      this.precio = this.cobranzaUltimoRepuesto.valor;
      this.descripcion = this.cobranzaUltimoRepuesto.detalle;
    }
  }

  formatterMarca = result => result.nombreMarca;

  searchMarca = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickMarca$.pipe(filter(() => !this.instanceMarca.isPopupOpen()));
    const inputFocus$ = this.focusMarca$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === '' ? this.marcas : this.marcas.filter(v => v.nombreMarca.toLowerCase().includes(term.toLowerCase()))).slice(0, 10)
      )
    );
  };

  marcado() {
    return this.seleccionado;
  }

  getArticuloAcobrar(): CobranzaRepuesto {
    // Si se usa la cobranza de la lista, devuelvo ese objeto, sino creo uno nuevo
    // Esto es para usar siempre la cobranza de la lista o crear solo distintos a la lista
    if (
      this.cobranzaUltimoRepuesto &&
      this.marca.id === this.cobranzaUltimoRepuesto.marca.id &&
      this.precio === this.cobranzaUltimoRepuesto.valor &&
      this.descripcion === this.cobranzaUltimoRepuesto.detalle
    ) {
      return this.cobranzaUltimoRepuesto;
    } else {
      const nuevaCobranzaRepuesto = new CobranzaRepuesto();
      nuevaCobranzaRepuesto.valor = this.precio;
      nuevaCobranzaRepuesto.tipoRepuesto = this.repuesto;
      // Creo una marca nueva
      if (typeof this.marca === 'string') {
        const marca = new Marca();
        marca.nombreMarca = this.marca as string;
        this.marca = marca;
      }
      nuevaCobranzaRepuesto.marca = this.marca;
      nuevaCobranzaRepuesto.detalle = this.descripcion;
      return nuevaCobranzaRepuesto;
    }
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
}
