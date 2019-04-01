import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';
import { MedioDePagoTarjetaComponent } from './medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaDetailComponent } from './medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjetaUpdateComponent } from './medio-de-pago-tarjeta-update.component';
import { MedioDePagoTarjetaDeletePopupComponent } from './medio-de-pago-tarjeta-delete-dialog.component';
import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class MedioDePagoTarjetaResolve implements Resolve<IMedioDePagoTarjeta> {
    constructor(private service: MedioDePagoTarjetaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((medioDePagoTarjeta: HttpResponse<MedioDePagoTarjeta>) => medioDePagoTarjeta.body));
        }
        return of(new MedioDePagoTarjeta());
    }
}

export const medioDePagoTarjetaRoute: Routes = [
    {
        path: 'medio-de-pago-tarjeta',
        component: MedioDePagoTarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago-tarjeta/:id/view',
        component: MedioDePagoTarjetaDetailComponent,
        resolve: {
            medioDePagoTarjeta: MedioDePagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago-tarjeta/new',
        component: MedioDePagoTarjetaUpdateComponent,
        resolve: {
            medioDePagoTarjeta: MedioDePagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago-tarjeta/:id/edit',
        component: MedioDePagoTarjetaUpdateComponent,
        resolve: {
            medioDePagoTarjeta: MedioDePagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medioDePagoTarjetaPopupRoute: Routes = [
    {
        path: 'medio-de-pago-tarjeta/:id/delete',
        component: MedioDePagoTarjetaDeletePopupComponent,
        resolve: {
            medioDePagoTarjeta: MedioDePagoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
