import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.service';
import { EstadoDetallePedidoComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido.component';
import { EstadoDetallePedidoDetailComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoUpdateComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido-update.component';
import { EstadoDetallePedidoDeletePopupComponent } from 'app/entities/estado-detalle-pedido/estado-detalle-pedido-delete-dialog.component';
import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

@Injectable({ providedIn: 'root' })
export class EstadoDetallePedidoResolve implements Resolve<IEstadoDetallePedido> {
    constructor(private service: EstadoDetallePedidoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoDetallePedido: HttpResponse<EstadoDetallePedido>) => estadoDetallePedido.body));
        }
        return of(new EstadoDetallePedido());
    }
}

export const estadoDetallePedidoRoute: Routes = [
    {
        path: 'estado-detalle-pedido',
        component: EstadoDetallePedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-detalle-pedido/:id/view',
        component: EstadoDetallePedidoDetailComponent,
        resolve: {
            estadoDetallePedido: EstadoDetallePedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-detalle-pedido/new',
        component: EstadoDetallePedidoUpdateComponent,
        resolve: {
            estadoDetallePedido: EstadoDetallePedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-detalle-pedido/:id/edit',
        component: EstadoDetallePedidoUpdateComponent,
        resolve: {
            estadoDetallePedido: EstadoDetallePedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoDetallePedidoPopupRoute: Routes = [
    {
        path: 'estado-detalle-pedido/:id/delete',
        component: EstadoDetallePedidoDeletePopupComponent,
        resolve: {
            estadoDetallePedido: EstadoDetallePedidoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
