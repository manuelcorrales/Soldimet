import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { PresupuestoService } from 'app/entities/presupuesto';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto.component';
import { RepuestosNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto.component';
import { OperacionesNuevopresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto.component';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'app/core/user/user.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-nuevo-presupuesto',
  templateUrl: './nuevo-presupuesto.component.html',
  styles: []
})
export class NuevoPresupuestoComponent implements OnInit {
  fecha: Date;
  empleado: DtoEmpleado;

  presupuesto: Presupuesto;
  @Output()
  detallesPresupuestos: DetallePresupuesto[] = [];
  @ViewChild('cliente', { static: false })
  clientesComponent: ClientesNuevopresupuestoComponent;
  @ViewChildren('repuestos')
  repuestoComponents: QueryList<RepuestosNuevopresupuestoComponent>;
  @ViewChildren('operaciones')
  operacionComponents: QueryList<OperacionesNuevopresupuestoComponent>;
  private eventSubscriber: Subscription;
  totalOperaciones = 0;
  totalRepuestos = 0;
  isSaving: boolean;

  presupuestoViejo: Presupuesto = null;
  mostrarResultadoBusquedaPresupuestoViejo = false;

  constructor(
    private presupuestosService: PresupuestosService,
    private eventManager: JhiEventManager,
    private presupuestoService: PresupuestoService,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private userService: UserService
  ) {
    this.fecha = new Date();
  }

  ngOnInit() {
    this.consultarPresupuesto();
    this.userService.getCurrentEmpleado().subscribe(
      (res: DtoEmpleado) => {
        this.empleado = res;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  consultarPresupuesto() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.load(params['id']);
        this.registerChangeInPresupuestos();
      } else {
        this.presupuesto = new Presupuesto();
        this.presupuesto.soldadura = false;
        this.presupuesto.importeTotal = 0;
      }
    });
  }

  load(id) {
    this.presupuestoService.find(id).subscribe(presupuesto => {
      this.presupuesto = presupuesto.body;
    });
  }

  registerChangeInPresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('presupuestoListModification', response => this.load(this.presupuesto.id));
  }

  guardarPresupuesto() {
    if (!this.presupuesto.soldadura) {
      // Si es soldadura no va a tener detalles
      this.completarDetalles();
      this.presupuesto.detallePresupuestos = this.detallesPresupuestos;
    }
    this.presupuesto.cliente = this.clientesComponent.getCliente();
    this.presupuesto.fechaCreacion = moment(this.fecha);
    this.presupuestosService.buscarEstadoCreado().subscribe(estado => {
      this.presupuesto.estadoPresupuesto = estado;
      this.save();
    });
  }

  private completarDetalles() {
    this.operacionComponents.forEach(componente => {
      componente.completarDetalle();
    });
    this.repuestoComponents.forEach(componente => {
      componente.completarDetalle();
    });
  }

  save() {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.presupuestosService.savePresupuesto(this.presupuesto));
  }

  private subscribeToSaveResponse(result: Observable<Presupuesto>) {
    result.subscribe((res: Presupuesto) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
  }

  private onSaveSuccess(result: Presupuesto) {
    this.isSaving = false;
    this.jhiAlertService.success('Se ha creado el presupuesto número: ' + result.id, { toast: true }, '.right');
    this.router.navigate(['/presupuestos']);
  }

  private onSaveError(error) {
    this.isSaving = false;
    this.onError(error);
  }

  private onError(error: any) {
    this.jhiAlertService.error(error.message, null, null);
  }

  @Input()
  recibirIsSoldadura(isSoldadura: boolean) {
    this.presupuesto.soldadura = isSoldadura;
  }

  @Input()
  recibirDetalle(detalle: DetallePresupuesto) {
    const tipoParteMotor: TipoParteMotor = detalle.tipoParteMotor;
    let detalleNuevo = true;
    this.detallesPresupuestos.forEach(detallePresupuestoCreado => {
      if (detallePresupuestoCreado.tipoParteMotor === tipoParteMotor) {
        detalleNuevo = false;
      }
    });
    if (detalleNuevo) {
      // Es el primer detalle agregado, busco un presupuesto con estos datos
      this.presupuestosService.buscarPresupuestoViejo(detalle.aplicacion.id, detalle.cilindrada.id).subscribe(
        (presupuesto: Presupuesto) => {
          this.presupuestoViejo = presupuesto;
          this.mostrarResultadoBusquedaPresupuestoViejo = true;
          this.agregarCobranzasPresupuestoEncontrado(detalle);
          this.detallesPresupuestos.push(detalle);
        },
        error => this.jhiAlertService.error(error.message)
      );
    } else {
      this.mostrarResultadoBusquedaPresupuestoViejo = true;
      this.agregarCobranzasPresupuestoEncontrado(detalle);
      this.detallesPresupuestos = this.detallesPresupuestos.filter(obj => obj !== detalle);
    }
  }

  agregarCobranzasPresupuestoEncontrado(detalle: DetallePresupuesto) {
    // Si hay un presupuesto hecho con los mismos detalles modifico las selecciones
    if (this.presupuestoViejo) {
      this.presupuestoViejo.detallePresupuestos.forEach((detalleViejo: DetallePresupuesto) => {
        if (detalleViejo.tipoParteMotor.id === detalle.tipoParteMotor.id) {
          detalle.cobranzaOperacions = detalleViejo.cobranzaOperacions;
          detalle.cobranzaRepuestos = detalleViejo.cobranzaRepuestos;
        }
      });
    }
  }

  @Input()
  setTotalOperaciones() {
    this.totalOperaciones = 0;
    this.operacionComponents.forEach(componente => {
      this.totalOperaciones = this.totalOperaciones + componente.total;
    });
    this.presupuesto.importeTotal = this.totalOperaciones + this.totalRepuestos;
  }

  @Input()
  setTotalRepuestos() {
    this.totalRepuestos = 0;
    this.repuestoComponents.forEach(componente => {
      this.totalRepuestos = this.totalRepuestos + componente.total;
    });
    this.presupuesto.importeTotal = this.totalOperaciones + this.totalRepuestos;
  }
}
