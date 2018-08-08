import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';
import { MovimientoPedidoComponent } from './movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from './movimiento-pedido-detail.component';
import { MovimientoPedidoUpdateComponent } from './movimiento-pedido-update.component';
import { MovimientoPedidoDeletePopupComponent } from './movimiento-pedido-delete-dialog.component';
import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

@Injectable({ providedIn: 'root' })
export class MovimientoPedidoResolve implements Resolve<IMovimientoPedido> {
    constructor(private service: MovimientoPedidoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((movimientoPedido: HttpResponse<MovimientoPedido>) => movimientoPedido.body));
        }
        return of(new MovimientoPedido());
    }
}

export const movimientoPedidoRoute: Routes = [
    {
        path: 'movimiento-pedido',
        component: MovimientoPedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-pedido/:id/view',
        component: MovimientoPedidoDetailComponent,
        resolve: {
            movimientoPedido: MovimientoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-pedido/new',
        component: MovimientoPedidoUpdateComponent,
        resolve: {
            movimientoPedido: MovimientoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-pedido/:id/edit',
        component: MovimientoPedidoUpdateComponent,
        resolve: {
            movimientoPedido: MovimientoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPedidoPopupRoute: Routes = [
    {
        path: 'movimiento-pedido/:id/delete',
        component: MovimientoPedidoDeletePopupComponent,
        resolve: {
            movimientoPedido: MovimientoPedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
