import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal';

@Component({
    selector: 'jhi-empleado-update',
    templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
    private _empleado: IEmpleado;
    isSaving: boolean;

    personas: IPersona[];

    sucursals: ISucursal[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private empleadoService: EmpleadoService,
        private personaService: PersonaService,
        private sucursalService: SucursalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ empleado }) => {
            this.empleado = empleado;
        });
        this.personaService.query({ filter: 'empleado-is-null' }).subscribe(
            (res: HttpResponse<IPersona[]>) => {
                if (!this.empleado.persona || !this.empleado.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.empleado.persona.id).subscribe(
                        (subRes: HttpResponse<IPersona>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sucursalService.query().subscribe(
            (res: HttpResponse<ISucursal[]>) => {
                this.sucursals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.empleado.id !== undefined) {
            this.subscribeToSaveResponse(this.empleadoService.update(this.empleado));
        } else {
            this.subscribeToSaveResponse(this.empleadoService.create(this.empleado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
        result.subscribe((res: HttpResponse<IEmpleado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPersonaById(index: number, item: IPersona) {
        return item.id;
    }

    trackSucursalById(index: number, item: ISucursal) {
        return item.id;
    }
    get empleado() {
        return this._empleado;
    }

    set empleado(empleado: IEmpleado) {
        this._empleado = empleado;
    }
}
