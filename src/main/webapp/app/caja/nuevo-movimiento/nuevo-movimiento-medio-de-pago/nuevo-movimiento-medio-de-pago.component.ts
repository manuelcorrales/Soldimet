import { JhiAlertService } from 'ng-jhipster';
import { BancoService } from 'app/entities/banco/banco.service';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { Banco, IBanco } from 'app/shared/model/banco.model';
import { FormaDePago, IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-nuevo-movimiento-medio-de-pago',
  templateUrl: './nuevo-movimiento-medio-de-pago.component.html',
  styleUrls: ['./nuevo-movimiento-medio-de-pago.component.scss'],
})
export class NuevoMovimientoMedioDePagoComponent implements OnInit {
  formaTipoTarjeta = 'Tarjeta';
  formaTipoChecke = 'Cheque';
  formaTipoEfectivo = 'Efectivo';

  formasDePago: FormaDePago[];
  bancos: Banco[];

  formaDePago: FormaDePago;
  medioPagoCheque: MedioDePagoCheque;

  medioDePago: MedioDePago;

  constructor(
    private formaDePagoService: FormaDePagoService,
    private bancoService: BancoService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.medioPagoCheque = new MedioDePagoCheque();
    this.medioDePago = new MedioDePago();
    this.formaDePagoService.query().subscribe(
      (res: HttpResponse<IFormaDePago[]>) => {
        this.formasDePago = res.body;
        this.formaDePago = this.formasDePago.find(forma => forma.nombreFormaDePago === 'Efectivo');
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
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

  defineMetodoPago() {
    if (this.formaDePago.nombreFormaDePago === this.formaTipoChecke) {
      this.medioDePago.medioDePagoCheque = this.medioPagoCheque;
    } else {
      // Tarjeta y efectivo no define más nada, solo la forma de pago
      this.medioDePago.medioDePagoCheque = null;
    }
    this.medioDePago.formaDePago = this.formaDePago;
  }
}
