import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';
import { EstadoPedidoRepuestoComponent } from './estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from './estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from './estado-pedido-repuesto-update.component';
import { EstadoPedidoRepuestoDeletePopupComponent } from './estado-pedido-repuesto-delete-dialog.component';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoPedidoRepuestoResolve implements Resolve<IEstadoPedidoRepuesto> {
    constructor(private service: EstadoPedidoRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoPedidoRepuesto: HttpResponse<EstadoPedidoRepuesto>) => estadoPedidoRepuesto.body));
        }
        return of(new EstadoPedidoRepuesto());
    }
}

export const estadoPedidoRepuestoRoute: Routes = [
    {
        path: 'estado-pedido-repuesto',
        component: EstadoPedidoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-pedido-repuesto/:id/view',
        component: EstadoPedidoRepuestoDetailComponent,
        resolve: {
            estadoPedidoRepuesto: EstadoPedidoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-pedido-repuesto/new',
        component: EstadoPedidoRepuestoUpdateComponent,
        resolve: {
            estadoPedidoRepuesto: EstadoPedidoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-pedido-repuesto/:id/edit',
        component: EstadoPedidoRepuestoUpdateComponent,
        resolve: {
            estadoPedidoRepuesto: EstadoPedidoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPedidoRepuestoPopupRoute: Routes = [
    {
        path: 'estado-pedido-repuesto/:id/delete',
        component: EstadoPedidoRepuestoDeletePopupComponent,
        resolve: {
            estadoPedidoRepuesto: EstadoPedidoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
