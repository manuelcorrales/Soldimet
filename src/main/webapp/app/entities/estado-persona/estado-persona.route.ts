import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from 'app/entities/estado-persona/estado-persona.service';
import { EstadoPersonaComponent } from 'app/entities/estado-persona/estado-persona.component';
import { EstadoPersonaDetailComponent } from 'app/entities/estado-persona/estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from 'app/entities/estado-persona/estado-persona-update.component';
import { EstadoPersonaDeletePopupComponent } from 'app/entities/estado-persona/estado-persona-delete-dialog.component';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';

@Injectable({ providedIn: 'root' })
export class EstadoPersonaResolve implements Resolve<IEstadoPersona> {
    constructor(private service: EstadoPersonaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoPersona: HttpResponse<EstadoPersona>) => estadoPersona.body));
        }
        return of(new EstadoPersona());
    }
}

export const estadoPersonaRoute: Routes = [
    {
        path: 'estado-persona',
        component: EstadoPersonaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-persona/:id/view',
        component: EstadoPersonaDetailComponent,
        resolve: {
            estadoPersona: EstadoPersonaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-persona/new',
        component: EstadoPersonaUpdateComponent,
        resolve: {
            estadoPersona: EstadoPersonaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-persona/:id/edit',
        component: EstadoPersonaUpdateComponent,
        resolve: {
            estadoPersona: EstadoPersonaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPersonaPopupRoute: Routes = [
    {
        path: 'estado-persona/:id/delete',
        component: EstadoPersonaDeletePopupComponent,
        resolve: {
            estadoPersona: EstadoPersonaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
