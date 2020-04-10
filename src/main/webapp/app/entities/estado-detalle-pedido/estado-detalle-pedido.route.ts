import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoDetallePedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoDetallePedido>) => response.ok),
        map((estadoDetallePedido: HttpResponse<EstadoDetallePedido>) => estadoDetallePedido.body)
      );
    }
    return of(new EstadoDetallePedido());
  }
}

export const estadoDetallePedidoRoute: Routes = [
  {
    path: '',
    component: EstadoDetallePedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoDetallePedidos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
