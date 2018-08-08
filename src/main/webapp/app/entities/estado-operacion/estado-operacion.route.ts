import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from './estado-operacion.service';
import { EstadoOperacionComponent } from './estado-operacion.component';
import { EstadoOperacionDetailComponent } from './estado-operacion-detail.component';
import { EstadoOperacionUpdateComponent } from './estado-operacion-update.component';
import { EstadoOperacionDeletePopupComponent } from './estado-operacion-delete-dialog.component';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';

@Injectable({ providedIn: 'root' })
export class EstadoOperacionResolve implements Resolve<IEstadoOperacion> {
    constructor(private service: EstadoOperacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoOperacion: HttpResponse<EstadoOperacion>) => estadoOperacion.body));
        }
        return of(new EstadoOperacion());
    }
}

export const estadoOperacionRoute: Routes = [
    {
        path: 'estado-operacion',
        component: EstadoOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-operacion/:id/view',
        component: EstadoOperacionDetailComponent,
        resolve: {
            estadoOperacion: EstadoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-operacion/new',
        component: EstadoOperacionUpdateComponent,
        resolve: {
            estadoOperacion: EstadoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-operacion/:id/edit',
        component: EstadoOperacionUpdateComponent,
        resolve: {
            estadoOperacion: EstadoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoOperacionPopupRoute: Routes = [
    {
        path: 'estado-operacion/:id/delete',
        component: EstadoOperacionDeletePopupComponent,
        resolve: {
            estadoOperacion: EstadoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
