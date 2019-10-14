import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
// import { IArticulo, Articulo } from 'app/shared/model/articulo.model';
// import { IMarca } from 'app/shared/model/marca.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { Proveedor, IProveedor } from 'app/shared/model/proveedor.model';
import { Persona, IPersona } from 'app/shared/model/persona.model';
// import { ArticuloService } from 'app/entities/articulo';
import { PersonaService } from 'app/entities/persona';
import { ProveedorService } from 'app/entities/proveedor';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-costo-repuesto',
  templateUrl: './costo-repuesto.component.html',
  styles: []
})
export class CostoRepuestoComponent implements OnInit {
  costoRepuesto: CostoRepuesto = new CostoRepuesto();
  @Input()
  cobranzaRepuesto: CobranzaRepuesto;
  @Input()
  proveedores: DtoBusquedaProveedor[];
  // @Input()
  // articulos: IArticulo[];
  // @Input()
  // marcas: IMarca[];
  @Input()
  detallePedido: DetallePedido;

  isSaving = false;

  proveedor: DtoBusquedaProveedor = null;
  // articulo: IArticulo = null;
  // marca: IMarca = null;
  valor: number = null;

  @ViewChild('instanceNTAProv', { static: false })
  instanceProv: NgbTypeahead;
  focusProv$ = new Subject<string>();
  clickProv$ = new Subject<string>();

  // @ViewChild('instanceNTAArt', { static: false })
  // instanceArt: NgbTypeahead;
  // focusArt$ = new Subject<string>();
  // clickArt$ = new Subject<string>();

  // @ViewChild('instanceNTAMarca', { static: false })
  // instanceMarca: NgbTypeahead;
  // focusMarca$ = new Subject<string>();
  // clickMarca$ = new Subject<string>();

  constructor(
    config: NgbTypeaheadConfig,
    private pedidoService: PedidosService,
    // private articuloService: ArticuloService,
    private personaService: PersonaService,
    private proveedorService: ProveedorService,
    private eventManager: JhiEventManager,
    private jhiAlertService: JhiAlertService
  ) {
    // customize default values of typeaheads used by this component tree
    config.showHint = true;
    config.container = true;
  }

  formatterProv = result => result.nombreProveedor;
  // formatterArt = result => result.descripcion;
  // formatterMarca = result => result.nombreMarca;

  ngOnInit() {
    if (this.detallePedido.costoRepuestos != null) {
      this.detallePedido.costoRepuestos.forEach(costo => {
        if (costo.tipoRepuesto.id === this.cobranzaRepuesto.tipoRepuesto.id) {
          this.costoRepuesto = costo;
        }
      });
    }
  }

  getCostoRepuesto() {
    return this.costoRepuesto;
  }

  searchProv = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickProv$.pipe(filter(() => !this.instanceProv.isPopupOpen()));
    const inputFocus$ = this.focusProv$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === '' ? this.proveedores : this.proveedores.filter(v => v.nombreProveedor.toLowerCase().includes(term.toLowerCase()))).slice(
          0,
          10
        )
      )
    );
  };

  // searchArt = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged()
  //   );
  //   const clicksWithClosedPopup$ = this.clickArt$.pipe(filter(() => !this.instanceArt.isPopupOpen()));
  //   const inputFocus$ = this.focusArt$;

  //   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
  //     map(term =>
  //       (term === '' ? this.articulos : this.articulos.filter(v => v.descripcion.toLowerCase().includes(term.toLowerCase()))).slice(0, 10)
  //     )
  //   );
  // };

  // searchMarca = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged()
  //   );
  //   const clicksWithClosedPopup$ = this.clickMarca$.pipe(filter(() => !this.instanceMarca.isPopupOpen()));
  //   const inputFocus$ = this.focusMarca$;

  //   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
  //     map(term =>
  //       (term === '' ? this.marcas : this.marcas.filter(v => v.nombreMarca.toLowerCase().includes(term.toLowerCase()))).slice(0, 10)
  //     )
  //   );
  // };

  // articuloSelected(articuloSelected) {
  //   this.marca = this.articulo.marca;
  // }

  actualizarPedidoDetalle() {
    this.preUpdateCostoRepuesto();
    this.isSaving = true;
  }

  updatePedidoDetalle() {
    this.pedidoService.updatePedidoDetalle(this.costoRepuesto, this.detallePedido.id).subscribe(
      nuevoCosto => {
        this.costoRepuesto = nuevoCosto;
        // eslint-disable-next-line no-console
        console.log(nuevoCosto);
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK' });
        this.isSaving = false;
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }

  preUpdateCostoRepuesto() {
    this.costoRepuesto.tipoRepuesto = this.cobranzaRepuesto.tipoRepuesto;
    this.costoRepuesto.valor = this.valor;
    // this.updateArticulo();
    this.updateProveedor();
  }

  // updateArticulo() {
  //   if (typeof this.articulo === 'string') {
  //     this.createAsync(this.articulo as string);
  //   } else {
  //     this.costoRepuesto.articulo = this.articulo;
  //     this.updateProveedor();
  //   }
  // }

  updateProveedor() {
    if (typeof this.proveedor === 'string') {
      this.createProvAsync(this.proveedor as string);
    } else {
      this.costoRepuesto.proveedor = new Proveedor(Number(this.proveedor.idProveedor));
      this.updatePedidoDetalle();
    }
  }

  // createAsync(descripcion: string) {
  //   const articulo: IArticulo = new Articulo();
  //   articulo.descripcion = this.articulo.descripcion;
  //   this.articuloService.create(articulo).subscribe((resp: HttpResponse<IArticulo>) => {
  //     this.articulo = resp.body;
  //     this.costoRepuesto.articulo = this.articulo;
  //   });
  // }

  createProvAsync(nombre: string) {
    let proveedor = new Proveedor();
    proveedor.nombreProveedor = nombre;
    proveedor.persona = new Persona();
    proveedor.persona.nombre = nombre;
    proveedor.persona.apellido = '';
    this.personaService.create(proveedor.persona).subscribe(
      (resp: HttpResponse<IPersona>) => {
        proveedor.persona = resp.body;
        this.proveedorService.create(proveedor).subscribe(
          (respProv: HttpResponse<IProveedor>) => {
            proveedor = respProv.body;
            this.costoRepuesto.proveedor = proveedor;
            this.updatePedidoDetalle();
          },
          error => {
            this.jhiAlertService.error(error.message);
          }
        );
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }

  recibirRepuesto() {
    this.isSaving = true;
    this.pedidoService.recibirRepuesto(this.costoRepuesto, this.detallePedido.id).subscribe(
      (costo: CostoRepuesto) => {
        this.costoRepuesto = costo;
        this.isSaving = false;
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK' });
      },
      error => {
        this.jhiAlertService.error(error.message);
      }
    );
  }
}
