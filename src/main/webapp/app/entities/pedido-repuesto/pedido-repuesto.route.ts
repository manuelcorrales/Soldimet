import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';
import { PedidoRepuestoComponent } from 'app/entities/pedido-repuesto/pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-update.component';
import { PedidoRepuestoDeletePopupComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-delete-dialog.component';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

@Injectable({ providedIn: 'root' })
export class PedidoRepuestoResolve implements Resolve<IPedidoRepuesto> {
    constructor(private service: PedidoRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pedidoRepuesto: HttpResponse<PedidoRepuesto>) => pedidoRepuesto.body));
        }
        return of(new PedidoRepuesto());
    }
}

export const pedidoRepuestoRoute: Routes = [
    {
        path: 'pedido-repuesto',
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
        path: 'pedido-repuesto/:id/view',
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
        path: 'pedido-repuesto/new',
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
        path: 'pedido-repuesto/:id/edit',
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
        path: 'pedido-repuesto/:id/delete',
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
