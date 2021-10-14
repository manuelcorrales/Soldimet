import { Component, OnInit } from '@angular/core';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { StockArticuloService } from 'app/entities/stock-articulo/stock-articulo.service';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { StockArticuloUpdateComponent } from 'app/entities/stock-articulo/stock-articulo-update.component';
import { filter, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RepuestosService } from 'app/repuestos/repuestos-services';
import { Observable, Subject } from 'rxjs';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { UserService } from 'app/core/user/user.service';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { IStockArticulo } from '../../shared/model/stock-articulo.model';

@Component({
  selector: 'jhi-create-update-stock',
  templateUrl: './create-update-stock.component.html',
  styleUrls: ['./create-update-stock.component.scss'],
})
export class CreateUpdateStockComponent extends StockArticuloUpdateComponent implements OnInit {
  empleado: DtoEmpleado;
  editForm = this.fb.group({
    id: [],
    cantidad: [null, Validators.required],
    medida: [null, Validators.required],
    sucursal: [null, Validators.required],
    articulo: [null],
    repuestoProveedor: [{ value: '' }, Validators.required],
  });

  stock: StockArticulo;

  searching = false;
  searchFailed = false;
  focusRepuestoProveedor$ = new Subject<string>();
  clickRepuestoProveedor$ = new Subject<string>();

  constructor(
    public activeModal: NgbActiveModal,
    protected jhiAlertService: JhiAlertService,
    protected stockArticuloService: StockArticuloService,
    protected medidaArticuloService: MedidaArticuloService,
    protected sucursalService: SucursalService,
    protected articuloService: ArticuloService,
    protected activatedRoute: ActivatedRoute,
    private repuestoService: RepuestosService,
    private eventManager: JhiEventManager,
    private userService: UserService,
    protected fb: FormBuilder
  ) {
    super(jhiAlertService, stockArticuloService, medidaArticuloService, articuloService, sucursalService, activatedRoute, fb);
  }
  updateForm(stockArticulo: StockArticulo) {
    super.updateForm(stockArticulo);
    if (stockArticulo.articulo) {
      this.editForm.get('repuestoProveedor').disable();
      this.editForm.patchValue({ articulo: stockArticulo.articulo });
    }
  }

  ngOnInit() {
    this.isSaving = false;
    this.updateForm(this.stock);
    this.medidaArticuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedidaArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedidaArticulo[]>) => response.body)
      )
      .subscribe(
        (res: IMedidaArticulo[]) => (this.medidaarticulos = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.sucursalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISucursal[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISucursal[]>) => response.body)
      )
      .subscribe(
        (res: ISucursal[]) => (this.sucursals = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userService.getCurrentEmpleado().subscribe(
      (res: DtoEmpleado) => {
        this.empleado = res;
        this.editForm.patchValue({
          sucursal: {
            id: this.empleado.sucursalId,
            nombreSucursal: this.empleado.sucursal,
          },
        });
        // eslint-disable-next-line no-console
        console.log(this.fb);
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  formatterRepuestoProveedor = (result: CostoRepuestoProveedor) => {
    if ((result as { value }).value === '') {
      return '';
    }
    const motor = result.aplicacion.motor.marcaMotor;
    const aplicacion = result.aplicacion.nombreAplicacion;
    const cilindrada = result.cilindrada.cantidadDeCilindros;
    const tipoRepuesto = result.tipoRepuesto.nombreTipoRepuesto;
    const marca = result.articulo.marca.nombreMarca;
    const codigoProveedor = result.articulo.codigoArticuloProveedor;
    return `${motor.toUpperCase()}(${cilindrada} Cil) ${aplicacion}(${tipoRepuesto} ${marca} ${codigoProveedor})`;
  };
  searchRepuestoProveedor = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchRepuestoProveedorByFilter(term))
    );

  async searchRepuestoProveedorByFilter(search = ''): Promise<CostoRepuestoProveedor[]> {
    this.searching = true;
    this.searchFailed = false;
    const page = await this.repuestoService.findRepuestoProveedorByFilter(search, 0, 20).toPromise();
    this.searching = false;
    this.searchFailed = false;
    return page.content;
  }

  clear() {
    this.activeModal.close();
  }
  previousState() {
    this.clear();
  }

  onSaveSuccess() {
    this.isSaving = false;
    this.eventManager.broadcast({ name: 'stockArticuloListModification', content: 'OK' });
    this.previousState();
  }

  protected createFromForm(): IStockArticulo {
    if (this.editForm.get(['articulo']).value != null) {
      return super.createFromForm();
    }

    return {
      ...new StockArticulo(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      medida: this.editForm.get(['medida']).value,
      articulo: this.editForm.get(['repuestoProveedor']).value.articulo,
      sucursal: this.editForm.get(['sucursal']).value,
    };
  }
}
