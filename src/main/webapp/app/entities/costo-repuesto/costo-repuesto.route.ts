import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { CostoRepuestoComponent } from './costo-repuesto.component';
import { CostoRepuestoDetailComponent } from './costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from './costo-repuesto-update.component';
import { CostoRepuestoDeletePopupComponent } from './costo-repuesto-delete-dialog.component';
import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class CostoRepuestoResolve implements Resolve<ICostoRepuesto> {
    constructor(private service: CostoRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((costoRepuesto: HttpResponse<CostoRepuesto>) => costoRepuesto.body));
        }
        return of(new CostoRepuesto());
    }
}

export const costoRepuestoRoute: Routes = [
    {
        path: 'costo-repuesto',
        component: CostoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-repuesto/:id/view',
        component: CostoRepuestoDetailComponent,
        resolve: {
            costoRepuesto: CostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-repuesto/new',
        component: CostoRepuestoUpdateComponent,
        resolve: {
            costoRepuesto: CostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-repuesto/:id/edit',
        component: CostoRepuestoUpdateComponent,
        resolve: {
            costoRepuesto: CostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoRepuestoPopupRoute: Routes = [
    {
        path: 'costo-repuesto/:id/delete',
        component: CostoRepuestoDeletePopupComponent,
        resolve: {
            costoRepuesto: CostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
