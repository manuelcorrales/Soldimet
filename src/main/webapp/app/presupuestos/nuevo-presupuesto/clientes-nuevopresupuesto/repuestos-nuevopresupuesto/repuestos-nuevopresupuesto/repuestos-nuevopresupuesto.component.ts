import { Component, OnInit, Output, Input, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { RepuestoPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuesto_precio/repuesto-precio.component';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { Articulo, IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-repuestos-nuevopresupuesto',
  templateUrl: './repuestos-nuevopresupuesto.component.html',
  styles: []
})
export class RepuestosNuevopresupuestoComponent implements OnInit {
  @Input() detalle: DetallePresupuesto;
  repuestosViejoPresupuesto: CobranzaRepuesto[];
  listaCobranzaRepuestos: CostoRepuestoProveedor[];
  listado = [];
  repuestos: TipoRepuesto[] = [];
  articulos: Articulo[] = [];
  total = 0;
  @ViewChildren('repuestoComponents') children: QueryList<RepuestoPrecioComponent>;
  @Output() eventoTotalRepuestos = new EventEmitter<number>();
  constructor(private _presupuestoService: PresupuestosService, private _articuloService: ArticuloService) {}

  ngOnInit() {
    this.repuestosViejoPresupuesto = this.detalle.cobranzaRepuestos || [];
    this.update();
  }

  enlistarRepuesto() {
    // Crea una lista con cobranzasRepuestos hechas y cobranzaUltimoPresupuesto agrupados por TipoRepuestos
    const lista = [];

    this.repuestos.forEach((tipoRepuesto: TipoRepuesto) => {
      let cobranzaRepuestoPresupuestoViejo = null;
      const listaCobranzas = [];
      this.repuestosViejoPresupuesto.forEach((cobranzaRepuesto: CobranzaRepuesto) => {
        if (cobranzaRepuesto.tipoRepuesto.id === tipoRepuesto.id) {
          cobranzaRepuestoPresupuestoViejo = cobranzaRepuesto;
        }
      });

      if (this.listaCobranzaRepuestos) {
        this.listaCobranzaRepuestos.forEach((cobranzaRepuesto: CobranzaRepuesto) => {
          if (cobranzaRepuesto.tipoRepuesto.id === tipoRepuesto.id) {
            listaCobranzas.push(cobranzaRepuesto);
          }
        });
      }

      const listaArticulos = this.articulos.filter(articulo => articulo.tipoRepuesto.id === tipoRepuesto.id);

      lista.push({
        repuesto: tipoRepuesto,
        cobranzaUltimoRepuesto: cobranzaRepuestoPresupuestoViejo,
        cobranzas: listaCobranzas,
        articulosList: listaArticulos
      });
    });
    return lista;
  }

  update() {
    this._articuloService.query().subscribe((articulos: HttpResponse<IArticulo[]>) => {
      this.articulos = articulos.body;
      this._presupuestoService.buscarRepuestos(this.detalle).subscribe((repuestos: TipoRepuesto[]) => {
        this.repuestos = repuestos;
        this.repuestos.sort(this._sortTipoRepuesto);
        this._presupuestoService
          .buscarListaCobranzaRepuestos(this.detalle.aplicacion.id, this.detalle.cilindrada.id, this.detalle.tipoParteMotor.id)
          .subscribe((cobranzas: CostoRepuestoProveedor[]) => {
            this.listaCobranzaRepuestos = cobranzas || [];
            this.listado = this.enlistarRepuesto();
          });
      });
    });
  }

  completarDetalle() {
    const cobranzaRepuesto: CobranzaRepuesto[] = [];
    this.children.forEach(componente => {
      if (componente.seleccionado) {
        cobranzaRepuesto.push(componente.getArticuloAcobrar());
      }
    });
    this.detalle.cobranzaRepuestos = cobranzaRepuesto;
  }

  getDetalle(): DetallePresupuesto {
    return this.detalle;
  }

  @Input()
  cambioTotalRepuestos() {
    this.total = 0;
    this.children.forEach(componente => {
      this.total = this.total + componente.getPrecio();
    });
    this.eventoTotalRepuestos.emit();
  }

  _sortTipoRepuesto(a: TipoRepuesto, b: TipoRepuesto) {
    if (a.nombreTipoRepuesto > b.nombreTipoRepuesto) {
      return 1;
    }
    if (a.nombreTipoRepuesto < b.nombreTipoRepuesto) {
      return -1;
    }
    return 0;
  }
}
