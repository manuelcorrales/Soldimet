import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';
import { TipoRepuestoComponent } from './tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from './tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from './tipo-repuesto-update.component';
import { TipoRepuestoDeletePopupComponent } from './tipo-repuesto-delete-dialog.component';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class TipoRepuestoResolve implements Resolve<ITipoRepuesto> {
    constructor(private service: TipoRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoRepuesto: HttpResponse<TipoRepuesto>) => tipoRepuesto.body));
        }
        return of(new TipoRepuesto());
    }
}

export const tipoRepuestoRoute: Routes = [
    {
        path: 'tipo-repuesto',
        component: TipoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-repuesto/:id/view',
        component: TipoRepuestoDetailComponent,
        resolve: {
            tipoRepuesto: TipoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-repuesto/new',
        component: TipoRepuestoUpdateComponent,
        resolve: {
            tipoRepuesto: TipoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-repuesto/:id/edit',
        component: TipoRepuestoUpdateComponent,
        resolve: {
            tipoRepuesto: TipoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoRepuestoPopupRoute: Routes = [
    {
        path: 'tipo-repuesto/:id/delete',
        component: TipoRepuestoDeletePopupComponent,
        resolve: {
            tipoRepuesto: TipoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
