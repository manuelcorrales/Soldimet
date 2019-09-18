import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';
import { EstadoCostoRepuestoComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.component';
import { EstadoCostoRepuestoDetailComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuestoUpdateComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-update.component';
import { EstadoCostoRepuestoDeletePopupComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-delete-dialog.component';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoCostoRepuestoResolve implements Resolve<IEstadoCostoRepuesto> {
    constructor(private service: EstadoCostoRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoCostoRepuesto: HttpResponse<EstadoCostoRepuesto>) => estadoCostoRepuesto.body));
        }
        return of(new EstadoCostoRepuesto());
    }
}

export const estadoCostoRepuestoRoute: Routes = [
    {
        path: 'estado-costo-repuesto',
        component: EstadoCostoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-costo-repuesto/:id/view',
        component: EstadoCostoRepuestoDetailComponent,
        resolve: {
            estadoCostoRepuesto: EstadoCostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-costo-repuesto/new',
        component: EstadoCostoRepuestoUpdateComponent,
        resolve: {
            estadoCostoRepuesto: EstadoCostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-costo-repuesto/:id/edit',
        component: EstadoCostoRepuestoUpdateComponent,
        resolve: {
            estadoCostoRepuesto: EstadoCostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoCostoRepuestoPopupRoute: Routes = [
    {
        path: 'estado-costo-repuesto/:id/delete',
        component: EstadoCostoRepuestoDeletePopupComponent,
        resolve: {
            estadoCostoRepuesto: EstadoCostoRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCostoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
