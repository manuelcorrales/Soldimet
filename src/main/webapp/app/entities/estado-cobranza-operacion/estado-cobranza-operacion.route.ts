import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';
import { EstadoCobranzaOperacionComponent } from './estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from './estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from './estado-cobranza-operacion-update.component';
import { EstadoCobranzaOperacionDeletePopupComponent } from './estado-cobranza-operacion-delete-dialog.component';
import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

@Injectable({ providedIn: 'root' })
export class EstadoCobranzaOperacionResolve implements Resolve<IEstadoCobranzaOperacion> {
    constructor(private service: EstadoCobranzaOperacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((estadoCobranzaOperacion: HttpResponse<EstadoCobranzaOperacion>) => estadoCobranzaOperacion.body));
        }
        return of(new EstadoCobranzaOperacion());
    }
}

export const estadoCobranzaOperacionRoute: Routes = [
    {
        path: 'estado-cobranza-operacion',
        component: EstadoCobranzaOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-cobranza-operacion/:id/view',
        component: EstadoCobranzaOperacionDetailComponent,
        resolve: {
            estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-cobranza-operacion/new',
        component: EstadoCobranzaOperacionUpdateComponent,
        resolve: {
            estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-cobranza-operacion/:id/edit',
        component: EstadoCobranzaOperacionUpdateComponent,
        resolve: {
            estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoCobranzaOperacionPopupRoute: Routes = [
    {
        path: 'estado-cobranza-operacion/:id/delete',
        component: EstadoCobranzaOperacionDeletePopupComponent,
        resolve: {
            estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
