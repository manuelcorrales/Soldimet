import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from './forma-de-pago.service';
import { FormaDePagoComponent } from './forma-de-pago.component';
import { FormaDePagoDetailComponent } from './forma-de-pago-detail.component';
import { FormaDePagoUpdateComponent } from './forma-de-pago-update.component';
import { FormaDePagoDeletePopupComponent } from './forma-de-pago-delete-dialog.component';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

@Injectable({ providedIn: 'root' })
export class FormaDePagoResolve implements Resolve<IFormaDePago> {
    constructor(private service: FormaDePagoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((formaDePago: HttpResponse<FormaDePago>) => formaDePago.body));
        }
        return of(new FormaDePago());
    }
}

export const formaDePagoRoute: Routes = [
    {
        path: 'forma-de-pago',
        component: FormaDePagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forma-de-pago/:id/view',
        component: FormaDePagoDetailComponent,
        resolve: {
            formaDePago: FormaDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forma-de-pago/new',
        component: FormaDePagoUpdateComponent,
        resolve: {
            formaDePago: FormaDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forma-de-pago/:id/edit',
        component: FormaDePagoUpdateComponent,
        resolve: {
            formaDePago: FormaDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formaDePagoPopupRoute: Routes = [
    {
        path: 'forma-de-pago/:id/delete',
        component: FormaDePagoDeletePopupComponent,
        resolve: {
            formaDePago: FormaDePagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
