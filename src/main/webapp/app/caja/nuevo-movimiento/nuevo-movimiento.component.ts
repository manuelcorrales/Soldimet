import { Component, OnInit, ViewChild } from '@angular/core';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { TipoMovimiento, ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { SubCategoria, ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento';
import { FormaDePagoService } from 'app/entities/forma-de-pago';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IFormaDePago, FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { SubCategoriaService } from 'app/entities/sub-categoria';
import { CategoriaPago, ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from 'app/entities/categoria-pago';
import { Tarjeta, ITarjeta } from 'app/shared/model/tarjeta.model';
import { TipoTarjeta, ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { TarjetaService } from 'app/entities/tarjeta';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta';
import { Banco, IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco';
import { Articulo, IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PresupuestoService } from 'app/entities/presupuesto';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto';
import { IPresupuesto, Presupuesto } from 'app/shared/model/presupuesto.model';
import { IPedidoRepuesto, PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-nuevo-movimiento',
    templateUrl: './nuevo-movimiento.component.html',
    styles: []
})
export class NuevoMovimientoComponent implements OnInit {
    subCategoriasArticulo = ['Compra artículos'];
    subCategoriasPresupuesto = ['Cobranza presupuesto'];
    subCategoriasPedidoRepuesto = ['Pedido de repuestos', 'Pago a Proveedor'];

    movimiento: Movimiento;
    tipos: TipoMovimiento[];
    categorias: CategoriaPago[];
    conceptos: SubCategoria[] = [];
    formasDePago: FormaDePago[];
    tipoTarjetas: ITipoTarjeta[];
    tarjetas: Tarjeta[];
    bancos: Banco[];
    articulos: Articulo[];
    pedidos: DtoPedidoCabecera[];
    presupuestos: DtoPresupuestoCabeceraComponent[];
    isSaving = false;

    categoria: CategoriaPago;
    subCategoria: SubCategoria;
    tipoMovimiento: TipoMovimiento;

    formaDePago: FormaDePago = null;
    tarjeta: Tarjeta;
    tipoTarjeta: TipoTarjeta;
    medioDePago: MedioDePago;

    banco: Banco;
    fechaRecibo: Date;
    fechaCobro: Date;

    isArticulo = false;
    @ViewChild('instanceNTAArt')
    instanceArt: NgbTypeahead;
    focusArt$ = new Subject<string>();
    clickArt$ = new Subject<string>();
    articulo: Articulo;

    isPresupuesto = false;
    presupuesto: DtoPresupuestoCabeceraComponent;

    isPedidoRepuesto = false;
    pedido: DtoPedidoCabecera;

    formatterArt = result => result.descripcion;

    constructor(
        config: NgbTypeaheadConfig,
        private tipoMovimientoService: TipoMovimientoService,
        private formaDePagoService: FormaDePagoService,
        private conceptosService: SubCategoriaService,
        private categoriaService: CategoriaPagoService,
        private cajaService: CajaModuleServiceService,
        private tarjetaService: TarjetaService,
        private tipoTarjetaService: TipoTarjetaService,
        private bancoService: BancoService,
        private articuloService: ArticuloService,
        private _presupuestosService: PresupuestosService,
        private pedidoService: PedidosService
    ) {}

    ngOnInit() {
        this.medioDePago = new MedioDePago();
        this.movimiento = new Movimiento();
        this.tipoMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoMovimiento[]>) => {
                this.tipos = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
        this.categoriaService.query().subscribe(
            (res: HttpResponse<ICategoriaPago[]>) => {
                this.categorias = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
        this.formaDePagoService.query().subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                this.formasDePago = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
    }

    buscarSubCategorias() {
        this.isArticulo = false;
        this.isPedidoRepuesto = false;
        this.isPresupuesto = false;
        this.conceptos = this.categoria.subCategorias;
    }

    buscarMedioDePagoData() {
        if (this.formaDePago.nombreFormaDePago === 'Débito') {
            this.tarjetaService.query().subscribe(
                (res: HttpResponse<ITarjeta[]>) => {
                    this.tarjetas = res.body;
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
            this.tipoTarjetaService.query().subscribe(
                (res: HttpResponse<ITipoTarjeta[]>) => {
                    this.tipoTarjetas = res.body;
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
        }
        if (this.formaDePago.nombreFormaDePago === 'Cheque') {
            this.bancoService.query().subscribe(
                (res: HttpResponse<IBanco[]>) => {
                    this.bancos = res.body;
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
        }
    }

    checkSubCategory() {
        if (this.subCategoria) {
            if (this.subCategoriasArticulo.find(x => x === this.subCategoria.nombreSubCategoria)) {
                this.isArticulo = true;
                this.isPedidoRepuesto = false;
                this.isPresupuesto = false;
                this.articuloService.query().subscribe(
                    (res: HttpResponse<IArticulo[]>) => {
                        this.articulos = res.body;
                    },
                    (res: HttpErrorResponse) => console.log(res.message)
                );
            }
            if (this.subCategoriasPresupuesto.find(x => x === this.subCategoria.nombreSubCategoria)) {
                this.isArticulo = false;
                this.isPedidoRepuesto = false;
                this.isPresupuesto = true;
                this._presupuestosService.findPresupuestoCabecera().subscribe((presupuestos: DtoPresupuestoCabeceraComponent[]) => {
                    this.presupuestos = presupuestos;
                });
            }
            if (this.subCategoriasPedidoRepuesto.find(x => x === this.subCategoria.nombreSubCategoria)) {
                this.isArticulo = false;
                this.isPedidoRepuesto = true;
                this.isPresupuesto = false;
                this.pedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
                    this.pedidos = pedidos;
                });
            }
        }
    }

    searchArt = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.clickArt$.pipe(filter(() => !this.instanceArt.isPopupOpen()));
        const inputFocus$ = this.focusArt$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === ''
                    ? this.articulos
                    : this.articulos.filter(v => v.descripcion.toLowerCase().indexOf(term.toLowerCase()) > -1)
                ).slice(0, 10)
            )
        );
    };

    private guardarMovimiento() {}
}
