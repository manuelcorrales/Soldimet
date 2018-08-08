import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';
import { PagoEfectivoComponent } from './pago-efectivo.component';
import { PagoEfectivoDetailComponent } from './pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from './pago-efectivo-update.component';
import { PagoEfectivoDeletePopupComponent } from './pago-efectivo-delete-dialog.component';
import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';

@Injectable({ providedIn: 'root' })
export class PagoEfectivoResolve implements Resolve<IPagoEfectivo> {
    constructor(private service: PagoEfectivoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pagoEfectivo: HttpResponse<PagoEfectivo>) => pagoEfectivo.body));
        }
        return of(new PagoEfectivo());
    }
}

export const pagoEfectivoRoute: Routes = [
    {
        path: 'pago-efectivo',
        component: PagoEfectivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-efectivo/:id/view',
        component: PagoEfectivoDetailComponent,
        resolve: {
            pagoEfectivo: PagoEfectivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-efectivo/new',
        component: PagoEfectivoUpdateComponent,
        resolve: {
            pagoEfectivo: PagoEfectivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-efectivo/:id/edit',
        component: PagoEfectivoUpdateComponent,
        resolve: {
            pagoEfectivo: PagoEfectivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoEfectivoPopupRoute: Routes = [
    {
        path: 'pago-efectivo/:id/delete',
        component: PagoEfectivoDeletePopupComponent,
        resolve: {
            pagoEfectivo: PagoEfectivoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
