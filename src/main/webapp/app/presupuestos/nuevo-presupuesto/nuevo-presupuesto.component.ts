import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output } from '@angular/core';
import { PresupuestosService } from '../presupuestos.service';
import { PresupuestoService } from '../../entities/presupuesto';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesNuevopresupuestoComponent } from './clientes-nuevopresupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto.component';
import { RepuestosNuevopresupuestoComponent } from './clientes-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto/repuestos-nuevopresupuesto.component';
import { OperacionesNuevopresupuestoComponent } from './clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto.component';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoPresupuestoService } from '../../entities/estado-presupuesto';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

@Component({
    selector: 'jhi-nuevo-presupuesto',
    templateUrl: './nuevo-presupuesto.component.html',
    styles: []
})
export class NuevoPresupuestoComponent implements OnInit {
    presupuesto: Presupuesto;
    @Output() detallesPresupuestos: DetallePresupuesto[] = [];
    @ViewChild('cliente') clientesComponent: ClientesNuevopresupuestoComponent;
    @ViewChildren('repuestos') repuestoComponents: QueryList<RepuestosNuevopresupuestoComponent>;
    @ViewChildren('operaciones') operacionComponents: QueryList<OperacionesNuevopresupuestoComponent>;
    private eventSubscriber: Subscription;
    totalOperaciones = 0;
    totalRepuestos = 0;
    isSaving: boolean;

    constructor(
        private presupuestosService: PresupuestosService,
        private eventManager: JhiEventManager,
        private presupuestoService: PresupuestoService,
        private route: ActivatedRoute,
        private router: Router,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.consultarPresupuesto();
    }

    consultarPresupuesto() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.load(params['id']);
                this.registerChangeInPresupuestos();
            } else {
                this.presupuesto = new Presupuesto();
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
        this.completarDetalles();
        this.presupuesto.cliente = this.clientesComponent.getCliente();
        this.presupuesto.detallePresupuestos = this.detallesPresupuestos;
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
        this.jhiAlertService.success('Se ha creado el presupuesto número: ' + result.id, null, null);
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
    recibirDetalle(detalle: DetallePresupuesto) {
        const tipoParteMotor: TipoParteMotor = detalle.tipoParteMotor;
        let detalleNuevo = true;
        this.detallesPresupuestos.forEach(detallePresupuestoCreado => {
            if (detallePresupuestoCreado.tipoParteMotor === tipoParteMotor) {
                detalleNuevo = false;
            }
        });
        if (detalleNuevo) {
            this.detallesPresupuestos.push(detalle);
        } else {
            this.detallesPresupuestos = this.detallesPresupuestos.filter(obj => obj !== detalle);
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
