import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';
import { PagoTarjetaComponent } from './pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from './pago-tarjeta-detail.component';
import { PagoTarjetaUpdateComponent } from './pago-tarjeta-update.component';
import { PagoTarjetaDeletePopupComponent } from './pago-tarjeta-delete-dialog.component';
import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class PagoTarjetaResolve implements Resolve<IPagoTarjeta> {
    constructor(private service: PagoTarjetaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pagoTarjeta: HttpResponse<PagoTarjeta>) => pagoTarjeta.body));
        }
        return of(new PagoTarjeta());
    }
}

export const pagoTarjetaRoute: Routes = [
    {
        path: 'pago-tarjeta',
        component: PagoTarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-tarjeta/:id/view',
        component: PagoTarjetaDetailComponent,
        resolve: {
            pagoTarjeta: PagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-tarjeta/new',
        component: PagoTarjetaUpdateComponent,
        resolve: {
            pagoTarjeta: PagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pago-tarjeta/:id/edit',
        component: PagoTarjetaUpdateComponent,
        resolve: {
            pagoTarjeta: PagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoTarjetaPopupRoute: Routes = [
    {
        path: 'pago-tarjeta/:id/delete',
        component: PagoTarjetaDeletePopupComponent,
        resolve: {
            pagoTarjeta: PagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
