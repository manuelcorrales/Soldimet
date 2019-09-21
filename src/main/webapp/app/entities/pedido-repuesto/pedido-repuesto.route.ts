import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from './pedido-repuesto.service';
import { PedidoRepuestoComponent } from './pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from './pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from './pedido-repuesto-update.component';
import { PedidoRepuestoDeletePopupComponent } from './pedido-repuesto-delete-dialog.component';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

@Injectable({ providedIn: 'root' })
export class PedidoRepuestoResolve implements Resolve<IPedidoRepuesto> {
  constructor(private service: PedidoRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPedidoRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PedidoRepuesto>) => response.ok),
        map((pedidoRepuesto: HttpResponse<PedidoRepuesto>) => pedidoRepuesto.body)
      );
    }
    return of(new PedidoRepuesto());
  }
}

export const pedidoRepuestoRoute: Routes = [
  {
    path: '',
    component: PedidoRepuestoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'PedidoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PedidoRepuestoDetailComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PedidoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PedidoRepuestoUpdateComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PedidoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PedidoRepuestoUpdateComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PedidoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pedidoRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PedidoRepuestoDeletePopupComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PedidoRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
