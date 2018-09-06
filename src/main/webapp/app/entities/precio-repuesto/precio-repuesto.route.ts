import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';
import { PrecioRepuestoComponent } from 'app/entities/precio-repuesto/precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from 'app/entities/precio-repuesto/precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from 'app/entities/precio-repuesto/precio-repuesto-update.component';
import { PrecioRepuestoDeletePopupComponent } from 'app/entities/precio-repuesto/precio-repuesto-delete-dialog.component';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

@Injectable({ providedIn: 'root' })
export class PrecioRepuestoResolve implements Resolve<IPrecioRepuesto> {
    constructor(private service: PrecioRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((precioRepuesto: HttpResponse<PrecioRepuesto>) => precioRepuesto.body));
        }
        return of(new PrecioRepuesto());
    }
}

export const precioRepuestoRoute: Routes = [
    {
        path: 'precio-repuesto',
        component: PrecioRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-repuesto/:id/view',
        component: PrecioRepuestoDetailComponent,
        resolve: {
            precioRepuesto: PrecioRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-repuesto/new',
        component: PrecioRepuestoUpdateComponent,
        resolve: {
            precioRepuesto: PrecioRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'precio-repuesto/:id/edit',
        component: PrecioRepuestoUpdateComponent,
        resolve: {
            precioRepuesto: PrecioRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioRepuestoPopupRoute: Routes = [
    {
        path: 'precio-repuesto/:id/delete',
        component: PrecioRepuestoDeletePopupComponent,
        resolve: {
            precioRepuesto: PrecioRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
