import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';
import { EstadoArticuloComponent } from './estado-articulo.component';
import { EstadoArticuloDetailComponent } from './estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from './estado-articulo-update.component';
import { EstadoArticuloDeletePopupComponent } from './estado-articulo-delete-dialog.component';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';

@Injectable({ providedIn: 'root' })
export class EstadoArticuloResolve implements Resolve<IEstadoArticulo> {
    constructor(private service: EstadoArticuloService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoArticulo: HttpResponse<EstadoArticulo>) => estadoArticulo.body));
        }
        return of(new EstadoArticulo());
    }
}

export const estadoArticuloRoute: Routes = [
    {
        path: 'estado-articulo',
        component: EstadoArticuloComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-articulo/:id/view',
        component: EstadoArticuloDetailComponent,
        resolve: {
            estadoArticulo: EstadoArticuloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-articulo/new',
        component: EstadoArticuloUpdateComponent,
        resolve: {
            estadoArticulo: EstadoArticuloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-articulo/:id/edit',
        component: EstadoArticuloUpdateComponent,
        resolve: {
            estadoArticulo: EstadoArticuloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoArticuloPopupRoute: Routes = [
    {
        path: 'estado-articulo/:id/delete',
        component: EstadoArticuloDeletePopupComponent,
        resolve: {
            estadoArticulo: EstadoArticuloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
