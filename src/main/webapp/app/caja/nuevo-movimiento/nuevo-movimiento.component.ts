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
import { Observable, Subject, merge, Subscription } from 'rxjs';
import { NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { JhiEventManager, JhiAlertService } from '../../../../../../node_modules/ng-jhipster';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { CajaService } from 'app/entities/caja';

@Component({
    selector: 'jhi-nuevo-movimiento',
    templateUrl: './nuevo-movimiento.component.html',
    styles: []
})
export class NuevoMovimientoComponent implements OnInit {
    private eventSubscriber: Subscription;

    formaTipoTarjeta = 'Tarjeta';
    formaTipoChecke = 'Cheque';
    formaTipoEfectivo = 'Efectivo';
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
    detalleMovimiento: DetalleMovimiento;

    categoria: CategoriaPago;
    subCategoria: SubCategoria;
    tipoMovimiento: TipoMovimiento;

    formaDePago: FormaDePago = null;
    medioDePago: MedioDePago;
    medioPagoTarjeta: MedioDePagoTarjeta;
    medioPagoCheque: MedioDePagoCheque;

    isArticulo = false;
    @ViewChild('instanceNTAArt')
    instanceArt: NgbTypeahead;
    focusArt$ = new Subject<string>();
    clickArt$ = new Subject<string>();
    articulo: Articulo;
    movimientoArticulo: MovimientoArticulo;

    isPresupuesto = false;
    @ViewChild('instanceNTAPresup')
    instancePresup: NgbTypeahead;
    focusPresup$ = new Subject<string>();
    clickPresup$ = new Subject<string>();
    presupuesto: DtoPresupuestoCabeceraComponent;
    movimientoPresupuesto: MovimientoPresupuesto;

    isPedidoRepuesto = false;
    @ViewChild('instanceNTAPedido')
    instancePedido: NgbTypeahead;
    focusPedido$ = new Subject<string>();
    clickPedido$ = new Subject<string>();
    pedido: DtoPedidoCabecera;
    movimientoPedido: MovimientoPedido;

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
        private pedidoService: PedidosService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private oldCajaService: CajaService
    ) {}

    ngOnInit() {
        this.medioDePago = new MedioDePago();
        this.medioPagoCheque = new MedioDePagoCheque();
        this.medioPagoTarjeta = new MedioDePagoTarjeta();
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
        if (this.formaDePago.nombreFormaDePago === this.formaTipoTarjeta) {
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
        if (this.formaDePago.nombreFormaDePago === this.formaTipoChecke) {
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
            this.detalleMovimiento = new DetalleMovimiento();
            // if (this.movimiento.detalleMovimientos) {
            //     this.movimiento.detalleMovimientos.push(this.detalleMovimiento);
            // } else {
            //     this.movimiento.detalleMovimientos = [this.detalleMovimiento];
            // }

            this.movimiento.detalleMovimientos = [this.detalleMovimiento];

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

    formatterArt = result => result.descripcion;
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

    formatterPresup = result => `${result.cliente} - ${result.motor}`;
    searchPresup = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.clickPresup$.pipe(filter(() => !this.instancePresup.isPopupOpen()));
        const inputFocus$ = this.focusPresup$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === ''
                    ? this.presupuestos
                    : this.presupuestos.filter(
                          v =>
                              v.motor.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                              v.cliente.toLowerCase().indexOf(term.toLowerCase()) > -1
                      )
                ).slice(0, 10)
            )
        );
    };

    formatterPedido = result => `${result.cliente} - ${result.motor} - (${result.tipo})`;
    searchPedido = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.clickPedido$.pipe(filter(() => !this.instancePedido.isPopupOpen()));
        const inputFocus$ = this.focusPedido$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === ''
                    ? this.pedidos
                    : this.pedidos.filter(
                          v =>
                              v.cliente.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                              v.motor.toLowerCase().indexOf(term.toLowerCase()) > -1
                      )
                ).slice(0, 10)
            )
        );
    };

    private defineMetodoPago() {
        if (this.formaDePago.nombreFormaDePago === this.formaTipoTarjeta) {
            this.medioDePago.medioDePagoTarjeta = this.medioPagoTarjeta;
            this.medioDePago.medioDePagoCheque = null;
        } else if (this.formaDePago.nombreFormaDePago === this.formaTipoChecke) {
            this.medioDePago.medioDePagoCheque = this.medioPagoCheque;
            this.medioDePago.medioDePagoTarjeta = null;
        } else if (this.formaDePago.nombreFormaDePago === this.formaTipoEfectivo) {
            // Efectivo no define más nada, solo la forma de pago
            this.medioDePago.medioDePagoTarjeta = null;
            this.medioDePago.medioDePagoCheque = null;
        }

        this.medioDePago.formaDePago = this.formaDePago;
        this.movimiento.medioDePago = this.medioDePago;
    }

    private guardarMovimiento() {
        this.movimiento.tipoMovimiento = this.tipoMovimiento;
        this.movimiento.subCategoria = this.subCategoria;
        this.defineMetodoPago();

        this.save();
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.cajaService.saveMovimiento(this.movimiento));
    }

    private subscribeToSaveResponse(result: Observable<Movimiento>) {
        result.subscribe((res: Movimiento) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Movimiento) {
        this.isSaving = false;
        this.jhiAlertService.success('Se ha creado el movimiento número: ' + result.id, { toast: true }, '.right');
        this.router.navigate(['/cajas']);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    consultarMovimiento() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.load(params['id']);
                this.registerChangeInMovimientos();
            } else {
                this.movimiento = new Movimiento();
                this.medioDePago = new MedioDePago();
                this.medioPagoCheque = new MedioDePagoCheque();
                this.medioPagoTarjeta = new MedioDePagoTarjeta();
            }
        });
    }

    registerChangeInMovimientos() {
        this.eventSubscriber = this.eventManager.subscribe('movimientoListModification', response => this.load(this.movimiento.id));
    }

    load(id) {
        this.oldCajaService.find(id).subscribe(movimiento => {
            this.movimiento = movimiento.body;
        });
    }
}
