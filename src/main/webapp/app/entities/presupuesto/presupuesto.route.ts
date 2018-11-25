import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoDetailComponent } from './presupuesto-detail.component';
import { PresupuestoUpdateComponent } from './presupuesto-update.component';
import { PresupuestoDeletePopupComponent } from './presupuesto-delete-dialog.component';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoResolve implements Resolve<IPresupuesto> {
    constructor(private service: PresupuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((presupuesto: HttpResponse<Presupuesto>) => presupuesto.body));
        }
        return of(new Presupuesto());
    }
}

export const presupuestoRoute: Routes = [
    {
        path: 'presupuesto',
        component: PresupuestoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto/:id/view',
        component: PresupuestoDetailComponent,
        resolve: {
            presupuesto: PresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto/new',
        component: PresupuestoUpdateComponent,
        resolve: {
            presupuesto: PresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presupuesto/:id/edit',
        component: PresupuestoUpdateComponent,
        resolve: {
            presupuesto: PresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoPopupRoute: Routes = [
    {
        path: 'presupuesto/:id/delete',
        component: PresupuestoDeletePopupComponent,
        resolve: {
            presupuesto: PresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
