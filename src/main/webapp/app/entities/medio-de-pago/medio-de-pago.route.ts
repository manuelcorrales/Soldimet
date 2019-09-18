import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';
import { MedioDePagoComponent } from 'app/entities/medio-de-pago/medio-de-pago.component';
import { MedioDePagoDetailComponent } from 'app/entities/medio-de-pago/medio-de-pago-detail.component';
import { MedioDePagoUpdateComponent } from 'app/entities/medio-de-pago/medio-de-pago-update.component';
import { MedioDePagoDeletePopupComponent } from 'app/entities/medio-de-pago/medio-de-pago-delete-dialog.component';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';

@Injectable({ providedIn: 'root' })
export class MedioDePagoResolve implements Resolve<IMedioDePago> {
    constructor(private service: MedioDePagoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((medioDePago: HttpResponse<MedioDePago>) => medioDePago.body));
        }
        return of(new MedioDePago());
    }
}

export const medioDePagoRoute: Routes = [
    {
        path: 'medio-de-pago',
        component: MedioDePagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago/:id/view',
        component: MedioDePagoDetailComponent,
        resolve: {
            medioDePago: MedioDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago/new',
        component: MedioDePagoUpdateComponent,
        resolve: {
            medioDePago: MedioDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medio-de-pago/:id/edit',
        component: MedioDePagoUpdateComponent,
        resolve: {
            medioDePago: MedioDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medioDePagoPopupRoute: Routes = [
    {
        path: 'medio-de-pago/:id/delete',
        component: MedioDePagoDeletePopupComponent,
        resolve: {
            medioDePago: MedioDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MedioDePagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
