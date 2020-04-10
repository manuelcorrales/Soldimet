import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';
import { EstadoPedidoRepuestoComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-update.component';
import { EstadoPedidoRepuestoDeletePopupComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-delete-dialog.component';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoPedidoRepuestoResolve implements Resolve<IEstadoPedidoRepuesto> {
  constructor(private service: EstadoPedidoRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoPedidoRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoPedidoRepuesto>) => response.ok),
        map((estadoPedidoRepuesto: HttpResponse<EstadoPedidoRepuesto>) => estadoPedidoRepuesto.body)
      );
    }
    return of(new EstadoPedidoRepuesto());
  }
}

export const estadoPedidoRepuestoRoute: Routes = [
  {
    path: '',
    component: EstadoPedidoRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPedidoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
