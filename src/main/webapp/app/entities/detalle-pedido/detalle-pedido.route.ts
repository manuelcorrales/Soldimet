import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';
import { DetallePedidoComponent } from 'app/entities/detalle-pedido/detalle-pedido.component';
import { DetallePedidoDetailComponent } from 'app/entities/detalle-pedido/detalle-pedido-detail.component';
import { DetallePedidoUpdateComponent } from 'app/entities/detalle-pedido/detalle-pedido-update.component';
import { DetallePedidoDeletePopupComponent } from 'app/entities/detalle-pedido/detalle-pedido-delete-dialog.component';
import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';

@Injectable({ providedIn: 'root' })
export class DetallePedidoResolve implements Resolve<IDetallePedido> {
  constructor(private service: DetallePedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetallePedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetallePedido>) => response.ok),
        map((detallePedido: HttpResponse<DetallePedido>) => detallePedido.body)
      );
    }
    return of(new DetallePedido());
  }
}

export const detallePedidoRoute: Routes = [
  {
    path: '',
    component: DetallePedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePedidos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetallePedidoDetailComponent,
    resolve: {
      detallePedido: DetallePedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePedidos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetallePedidoUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePedidos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetallePedidoUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePedidos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detallePedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetallePedidoDeletePopupComponent,
    resolve: {
      detallePedido: DetallePedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePedidos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
