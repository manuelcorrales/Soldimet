import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPedidoService } from 'app/entities/movimiento-pedido/movimiento-pedido.service';
import { MovimientoPedidoComponent } from 'app/entities/movimiento-pedido/movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-detail.component';
import { MovimientoPedidoUpdateComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-update.component';
import { MovimientoPedidoDeletePopupComponent } from 'app/entities/movimiento-pedido/movimiento-pedido-delete-dialog.component';
import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

@Injectable({ providedIn: 'root' })
export class MovimientoPedidoResolve implements Resolve<IMovimientoPedido> {
  constructor(private service: MovimientoPedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovimientoPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MovimientoPedido>) => response.ok),
        map((movimientoPedido: HttpResponse<MovimientoPedido>) => movimientoPedido.body)
      );
    }
    return of(new MovimientoPedido());
  }
}

export const movimientoPedidoRoute: Routes = [
  {
    path: '',
    component: MovimientoPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPedidos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
