import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';
import { CategoriaPagoComponent } from './categoria-pago.component';
import { CategoriaPagoDetailComponent } from './categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from './categoria-pago-update.component';
import { CategoriaPagoDeletePopupComponent } from './categoria-pago-delete-dialog.component';
import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';

@Injectable({ providedIn: 'root' })
export class CategoriaPagoResolve implements Resolve<ICategoriaPago> {
    constructor(private service: CategoriaPagoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((categoriaPago: HttpResponse<CategoriaPago>) => categoriaPago.body));
        }
        return of(new CategoriaPago());
    }
}

export const categoriaPagoRoute: Routes = [
    {
        path: 'categoria-pago',
        component: CategoriaPagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-pago/:id/view',
        component: CategoriaPagoDetailComponent,
        resolve: {
            categoriaPago: CategoriaPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-pago/new',
        component: CategoriaPagoUpdateComponent,
        resolve: {
            categoriaPago: CategoriaPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-pago/:id/edit',
        component: CategoriaPagoUpdateComponent,
        resolve: {
            categoriaPago: CategoriaPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaPagoPopupRoute: Routes = [
    {
        path: 'categoria-pago/:id/delete',
        component: CategoriaPagoDeletePopupComponent,
        resolve: {
            categoriaPago: CategoriaPagoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
