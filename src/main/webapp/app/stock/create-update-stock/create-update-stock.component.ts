import { ISucursal } from './../../entities/sucursal/sucursal.model';
import { CostoRepuestoProveedor } from './../../entities/costo-repuesto-proveedor/costo-repuesto-proveedor.model';
import { IMedidaArticulo } from './../../entities/medida-articulo/medida-articulo.model';
import { EventManager } from './../../core/util/event-manager.service';
import { ArticuloService } from './../../entities/articulo/service/articulo.service';
import { SucursalService } from './../../entities/sucursal/service/sucursal.service';
import { MedidaArticuloService } from './../../entities/medida-articulo/service/medida-articulo.service';
import { StockArticuloService } from './../../entities/stock-articulo/service/stock-articulo.service';
import { StockArticulo, IStockArticulo } from './../../entities/stock-articulo/stock-articulo.model';
import { StockArticuloUpdateComponent } from './../../entities/stock-articulo/update/stock-articulo-update.component';
import { AlertService } from './../../core/util/alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/core/user/user.service';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { Observable, Subject } from 'rxjs';
import { RepuestosService } from 'app/repuestos/repuestos-services';

@Component({
  selector: 'jhi-create-update-stock',
  templateUrl: './create-update-stock.component.html',
  styleUrls: ['./create-update-stock.component.scss'],
})
export class CreateUpdateStockComponent extends StockArticuloUpdateComponent implements OnInit {
  empleado: DtoEmpleado | undefined;
  editForm = this.fb.group({
    id: [],
    cantidad: [null, Validators.required],
    medida: [null, Validators.required],
    sucursal: [null, Validators.required],
    articulo: [null],
    repuestoProveedor: [{ value: '' }, Validators.required],
  });

  stock: StockArticulo | undefined;

  searching = false;
  searchFailed = false;
  focusRepuestoProveedor$ = new Subject<string>();
  clickRepuestoProveedor$ = new Subject<string>();

  constructor(
    public activeModal: NgbActiveModal,
    protected jhiAlertService: AlertService,
    protected stockArticuloService: StockArticuloService,
    protected medidaArticuloService: MedidaArticuloService,
    protected sucursalService: SucursalService,
    protected articuloService: ArticuloService,
    protected activatedRoute: ActivatedRoute,
    private repuestoService: RepuestosService,
    private eventManager: EventManager,
    private userService: UserService,
    protected fb: FormBuilder
  ) {
    super(stockArticuloService, medidaArticuloService, articuloService, sucursalService, activatedRoute, fb);
  }
  updateForm(stockArticulo: StockArticulo) {
    super.updateForm(stockArticulo);
    if (stockArticulo.articulo) {
      this.editForm.get('repuestoProveedor')!.disable();
      this.editForm.patchValue({ articulo: stockArticulo.articulo });
    }
  }

  onError(message: string): void {
    this.jhiAlertService.addAlert({ type: 'danger', message });
  }

  ngOnInit() {
    this.isSaving = false;
    this.updateForm(this.stock!);
    this.medidaArticuloService
      .query()
      .pipe(map((res: HttpResponse<IMedidaArticulo[]>) => res.body ?? []))
      .pipe(
        map((medidaArticulos: IMedidaArticulo[]) =>
          this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(medidaArticulos, this.editForm.get('medida')!.value)
        )
      )
      .subscribe((medidaArticulos: IMedidaArticulo[]) => (this.medidaArticulosSharedCollection = medidaArticulos));
    this.sucursalService
      .query()
      .pipe(map((res: HttpResponse<ISucursal[]>) => res.body ?? []))
      .pipe(
        map((sucursals: ISucursal[]) =>
          this.sucursalService.addSucursalToCollectionIfMissing(sucursals, this.editForm.get('sucursal')!.value)
        )
      )
      .subscribe((sucursals: ISucursal[]) => (this.sucursalsSharedCollection = sucursals));
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
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  formatterRepuestoProveedor = (result: CostoRepuestoProveedor) => {
    if ((result as { value: any }).value === '') {
      return '';
    }
    const motor = result.aplicacion?.motor?.marcaMotor;
    const aplicacion = result.aplicacion?.nombreAplicacion;
    const cilindrada = result.cilindrada?.cantidadDeCilindros;
    const tipoRepuesto = result.tipoRepuesto?.nombreTipoRepuesto;
    const marca = result.articulo?.marca?.nombreMarca;
    const codigoProveedor = result.articulo?.codigoArticuloProveedor;
    return `${motor!.toUpperCase()}(${cilindrada!} Cil) ${aplicacion!}(${tipoRepuesto!} ${marca!} ${codigoProveedor!})`;
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
    if (this.editForm.get(['articulo'])!.value != null) {
      return super.createFromForm();
    }

    return {
      ...new StockArticulo(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      medida: this.editForm.get(['medida'])!.value,
      articulo: this.editForm.get(['repuestoProveedor'])!.value.articulo,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}
