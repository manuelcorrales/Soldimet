import { AccountService } from 'app/core/auth/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from 'app/dto/page/page';
import { BaseFilterPageableComponent } from 'app/shared/base-filter-pageable/base-filter-pageable.component';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DtoMovimientoCabecera, DtoCajaDia } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { CajaModuleServiceService } from 'app/caja/caja-module-service.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal';
import { UserService } from 'app/core/user/user.service';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-caja',
  templateUrl: './caja.component.html',
  styles: [],
})
export class CajaComponent extends BaseFilterPageableComponent<DtoMovimientoCabecera> implements OnInit {
  fechaDesde = null;
  fechaHasta = null;

  @ViewChild('d1', { static: true }) datepickerDesde: NgbDatepicker;
  @ViewChild('d2', { static: true }) datepickerHasta: NgbDatepicker;

  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;
  eventSubscriber: Subscription;
  sucursales: ISucursal[] = [];

  caja: DtoCajaDia = null;
  empleado: DtoEmpleado;
  formGroup: FormGroup;
  sucursal: ISucursal;

  constructor(
    private accountService: AccountService,
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private cajaService: CajaModuleServiceService,
    private eventManager: JhiEventManager,
    private sucursalService: SucursalService,
    private userService: UserService,
    private jhiAlertService: JhiAlertService
  ) {
    super();
    this.searchableService = cajaService;
  }

  async ngOnInit() {
    this.formGroup = new FormGroup({
      FechaDesde: new FormControl('', [Validators.required]),
      FechaHasta: new FormControl('', [Validators.required]),
    });
    this.datepickerDesde.minDate = { year: 2019, month: 1, day: 1 };
    this.datepickerDesde.maxDate = this.calendar.getToday();
    this.datepickerHasta.minDate = { year: 2019, month: 1, day: 1 };
    this.datepickerHasta.maxDate = this.calendar.getToday();
    this.empleado = await this.userService.getCurrentEmpleado().toPromise();
    this.sucursales = (await this.sucursalService.query().toPromise()).body;
    this.sucursal = this.sucursales.find(sucursal => sucursal.id === this.empleado.sucursalId);
    this.puedeVerSucursales();
    this.caja = await this.cajaService.getCajaDia(this.sucursal.id).toPromise();
    super.ngOnInit();
    this.eventSubscriber = this.eventManager.subscribe('movimientosDiaModificacion', response => this.requestContent());
  }

  public requestContent() {
    this.searchableService
      .findByFilteredPage(this.searchText, this.sucursal.id, this.fechaDesde, this.fechaHasta, this.page - 1, this.pageSize)
      .subscribe(
        (response: Page<DtoMovimientoCabecera>) => {
          this.totalItems = response.totalElements;
          this.content = response.content;
        },
        error => this.onError(error.message)
      );
    this.cajaService.getCajaDia(this.sucursal.id).subscribe(res => (this.caja = res));
  }

  puedeVerSucursales() {
    // No permito que vea todas las sucursales si no tiene permisos
    if (!this.accountService.hasAnyAuthority(['ROLE_JEFE', 'ROLE_ADMIN'])) {
      this.sucursales = [this.sucursal];
    }
  }

  limpiarFiltros() {
    this.sucursal = this.sucursales.find(sucursal => sucursal.id === this.empleado.sucursalId);
    this.searchText = null;
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.requestContent();
  }

  onDateSelection() {
    const fechaDesde = this.formatDate(this.formGroup.value['FechaDesde']);
    const fechaHasta = this.formatDate(this.formGroup.value['FechaHasta']);
    if (fechaDesde !== null && fechaHasta !== null) {
      this.fechaDesde = fechaDesde;
      this.fechaHasta = fechaHasta;
      this.requestContent();
    }
  }

  formatDate(date: any) {
    return date !== '' ? date.format(date._f) : null;
  }
}
