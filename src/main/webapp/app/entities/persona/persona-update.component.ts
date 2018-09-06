import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IDireccion } from 'app/shared/model/direccion.model';
import { DireccionService } from 'app/entities/direccion';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from 'app/entities/estado-persona';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-persona-update',
    templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
    private _persona: IPersona;
    isSaving: boolean;

    direccions: IDireccion[];

    estadopersonas: IEstadoPersona[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private personaService: PersonaService,
        private direccionService: DireccionService,
        private estadoPersonaService: EstadoPersonaService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
        this.direccionService.query({ filter: 'persona-is-null' }).subscribe(
            (res: HttpResponse<IDireccion[]>) => {
                if (!this.persona.direccion || !this.persona.direccion.id) {
                    this.direccions = res.body;
                } else {
                    this.direccionService.find(this.persona.direccion.id).subscribe(
                        (subRes: HttpResponse<IDireccion>) => {
                            this.direccions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estadoPersonaService.query().subscribe(
            (res: HttpResponse<IEstadoPersona[]>) => {
                this.estadopersonas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>) {
        result.subscribe((res: HttpResponse<IPersona>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDireccionById(index: number, item: IDireccion) {
        return item.id;
    }

    trackEstadoPersonaById(index: number, item: IEstadoPersona) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get persona() {
        return this._persona;
    }

    set persona(persona: IPersona) {
        this._persona = persona;
    }
}
