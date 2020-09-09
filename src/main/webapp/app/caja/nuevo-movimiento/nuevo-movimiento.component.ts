import { Component, OnInit, ViewChild } from '@angular/core';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { TipoMovimiento, ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento';
import { FormaDePagoService } from 'app/entities/forma-de-pago';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IFormaDePago, FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { CategoriaPago, ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from 'app/entities/categoria-pago';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { Banco, IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco';
import { debounceTime, distinctUntilChanged, filter, map, tap, switchMap, catchError } from 'rxjs/operators';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { Observable, Subject, merge, Subscription, of } from 'rxjs';
import { NgbTypeaheadConfig, NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MovimientoPresupuesto, IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from 'app/entities/caja';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto';
import { PresupuestoService } from 'app/entities/presupuesto';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { UserService } from 'app/core/user/user.service';
import { Page } from 'app/dto/page/page';

@Component({
  selector: 'jhi-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styles: []
})
export class NuevoMovimientoComponent implements OnInit {
  eventSubscriber: Subscription;
  fecha: Date;
  empleado: DtoEmpleado;

  formaTipoTarjeta = 'Tarjeta';
  formaTipoChecke = 'Cheque';
  formaTipoEfectivo = 'Efectivo';

  movimiento: Movimiento;
  tipos: TipoMovimiento[];
  categorias: CategoriaPago[];
  conceptos: SubCategoria[];
  formasDePago: FormaDePago[];
  bancos: Banco[];
  pedidos: DtoPedidoCabecera[];
  costoRepuestos: CostoRepuesto[];
  isSaving = false;

  categoria: CategoriaPago;
  tipoMovimiento: TipoMovimiento;
  @ViewChild('instanceNTAconcepto', { static: false })
  instanceconcepto: NgbTypeahead;
  focusconcepto$ = new Subject<string>();
  clickconcepto$ = new Subject<string>();
  concepto: SubCategoria;

  formaDePago: FormaDePago;
  medioDePago: MedioDePago;
  medioPagoCheque: MedioDePagoCheque;

  isPresupuesto = false;
  @ViewChild('instanceNTAPresup', { static: false })
  instancePresup: NgbTypeahead;
  presupuesto: DtoPresupuestoCabeceraComponent;
  focusPresup$ = new Subject<string>();
  clickPresup$ = new Subject<string>();
  movimientoPresupuesto: MovimientoPresupuesto;
  searchingPresupuesto = false;
  searchFailed = false;

  constructor(
    config: NgbTypeaheadConfig,
    private tipoMovimientoService: TipoMovimientoService,
    private formaDePagoService: FormaDePagoService,
    private categoriaService: CategoriaPagoService,
    private cajaService: CajaModuleServiceService,
    private bancoService: BancoService,
    private _presupuestosService: PresupuestosService,
    private eventManager: JhiEventManager,
    private route: ActivatedRoute,
    private router: Router,
    private jhiAlertService: JhiAlertService,
    private oldCajaService: CajaService,
    private presupuestoService: PresupuestoService,
    private movimientoPresupuestoService: MovimientoPresupuestoService,
    private userService: UserService
  ) {
    this.fecha = new Date();
  }

  ngOnInit() {
    this.consultarMovimiento();
    this.tipoMovimientoService.query().subscribe(
      (res: HttpResponse<ITipoMovimiento[]>) => {
        this.tipos = res.body;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
    this.categoriaService.query().subscribe(
      (res: HttpResponse<ICategoriaPago[]>) => {
        this.categorias = res.body;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
    this.formaDePagoService.query().subscribe(
      (res: HttpResponse<IFormaDePago[]>) => {
        this.formasDePago = res.body;
        this.formaDePago = this.formasDePago.find(forma => forma.nombreFormaDePago === 'Efectivo');
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
    this.userService.getCurrentEmpleado().subscribe(
      (res: DtoEmpleado) => {
        this.empleado = res;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  buscarSubCategorias() {
    this.conceptos = this.categoria.subCategorias;
    this.concepto = null;
  }

  buscarMedioDePagoData() {
    if (this.formaDePago.nombreFormaDePago === this.formaTipoChecke) {
      this.bancoService.query().subscribe(
        (res: HttpResponse<IBanco[]>) => {
          this.bancos = res.body;
        },
        (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
      );
    }
  }

  seleccionarPresupuesto(event: NgbTypeaheadSelectItemEvent) {
    this.presupuesto = event.item;
    this._presupuestosService.findCostoRepuestoPresupuesto(this.presupuesto.codigo).subscribe(
      (costoRepuestos: CostoRepuesto[]) => {
        this.costoRepuestos = costoRepuestos;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  agregarRepuestoADetalle(costoRepuesto: CostoRepuesto) {
    if (!this.movimientoPresupuesto.costoRepuestos) {
      this.movimientoPresupuesto.costoRepuestos = [];
    }
    this.movimientoPresupuesto.costoRepuestos.push(costoRepuesto);
  }

  formatterconcepto = result => result.nombreSubCategoria;
  searchconcepto = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickconcepto$.pipe(filter(() => !this.instanceconcepto.isPopupOpen()));
    const inputFocus$ = this.focusconcepto$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ''
          ? this.conceptos
          : // es-lint-ignore-next-line prefer-includes
            this.conceptos.filter(v => v.nombreSubCategoria.toLowerCase().includes(term.toLowerCase()))
        ).slice(0, 10)
      )
    );
  };

  formatterPresup = (result: DtoPresupuestoCabeceraComponent) => {
    return result.isSoldadura ? `${result.cliente} - Soldadura` : `${result.codigo} - ${result.cliente} - ${result.motor}`;
  };

  searchPresup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.searchingPresupuesto = true)),
      switchMap(term => {
        if (term === '') {
          this.presupuesto = null;
          return of([]);
        }
        return this._presupuestosService.findByFilteredPage(term).pipe(
          tap(() => (this.searchFailed = false)),
          map((response: Page<DtoPresupuestoCabeceraComponent>) => {
            return response.content;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        );
      }),
      tap(() => (this.searchingPresupuesto = false))
    );

  private defineMetodoPago() {
    if (this.formaDePago.nombreFormaDePago === this.formaTipoChecke) {
      this.medioDePago.medioDePagoCheque = this.medioPagoCheque;
    } else {
      // Tarjeta y efectivo no define más nada, solo la forma de pago
      this.medioDePago.medioDePagoCheque = null;
    }

    this.medioDePago.formaDePago = this.formaDePago;
    this.movimiento.medioDePago = this.medioDePago;
  }

  async guardarMovimiento() {
    await this.preGuardarMovimiento();
    this.save();
  }

  save() {
    this.isSaving = true;

    this.subscribeToSaveResponse(this.cajaService.saveMovimiento(this.movimiento));
  }

  private subscribeToSaveResponse(result: Observable<Movimiento>) {
    result.subscribe((res: Movimiento) => this.onSaveMovimientoSuccess(res), (res: Response) => this.onSaveError(res));
  }

  private onSaveMovimientoSuccess(result: Movimiento) {
    this.saveDetalles(result);
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
        this.movimientoPresupuesto = new MovimientoPresupuesto();
        this.medioDePago = new MedioDePago();
        this.medioPagoCheque = new MedioDePagoCheque();
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

  saveDetalles(movimiento: Movimiento) {
    this.movimientoPresupuesto.movimiento = movimiento;
    this.saveDetalle();
  }

  saveDetalle() {
    if (this.presupuesto) {
      this.presupuestoService.find(this.presupuesto.codigo).subscribe(
        (presupuesto: HttpResponse<IPresupuesto>) => {
          this.movimientoPresupuesto.presupuesto = presupuesto.body;
          this._saveMovimientoPresupuesto();
        },
        error => {
          this.jhiAlertService.error(error);
        }
      );
    } else {
      this.onSaveFinalSuccess();
    }
  }

  _saveMovimientoPresupuesto() {
    if (this.movimientoPresupuesto.id !== undefined) {
      this.subscribeToSaveDetalleResponse(this.movimientoPresupuestoService.update(this.movimientoPresupuesto));
    } else {
      this.subscribeToSaveDetalleResponse(this.movimientoPresupuestoService.create(this.movimientoPresupuesto));
    }
  }

  subscribeToSaveDetalleResponse(result: Observable<HttpResponse<IMovimientoPresupuesto>>) {
    result.subscribe(
      (res: HttpResponse<IMovimientoPresupuesto>) => this.onSaveFinalSuccess(),
      (res: HttpErrorResponse) => this.onSaveError(res)
    );
  }

  private onSaveFinalSuccess() {
    this.isSaving = false;
    this.jhiAlertService.success(
      'Se ha creado el movimiento número: ' + this.movimientoPresupuesto.movimiento.id,
      { toast: true },
      '.right'
    );
    this.router.navigate(['/cajas']);
  }

  async preGuardarMovimiento() {
    if (typeof this.concepto === 'string') {
      const nombreSubCategoria = this.concepto as string;
      this.concepto = new SubCategoria();
      this.concepto.nombreSubCategoria = nombreSubCategoria;
      // agrego la subcategoria a la lista en categoria
      this.categoria.subCategorias.push(this.concepto);
      const response = await this.categoriaService.update(this.categoria).toPromise();
      this.categoria = response.body;
      this.concepto = this.categoria.subCategorias.find(sub => sub.nombreSubCategoria === this.concepto.nombreSubCategoria);
    }
    this.movimiento.tipoMovimiento = this.tipoMovimiento;
    this.movimiento.subCategoria = this.concepto;
    this.defineMetodoPago();
  }

  crearSubcategoria() {}
}
