import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from './costo-operacion.service';
import { CostoOperacionComponent } from './costo-operacion.component';
import { CostoOperacionDetailComponent } from './costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from './costo-operacion-update.component';
import { CostoOperacionDeletePopupComponent } from './costo-operacion-delete-dialog.component';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';

@Injectable({ providedIn: 'root' })
export class CostoOperacionResolve implements Resolve<ICostoOperacion> {
    constructor(private service: CostoOperacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((costoOperacion: HttpResponse<CostoOperacion>) => costoOperacion.body));
        }
        return of(new CostoOperacion());
    }
}

export const costoOperacionRoute: Routes = [
    {
        path: 'costo-operacion',
        component: CostoOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-operacion/:id/view',
        component: CostoOperacionDetailComponent,
        resolve: {
            costoOperacion: CostoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-operacion/new',
        component: CostoOperacionUpdateComponent,
        resolve: {
            costoOperacion: CostoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-operacion/:id/edit',
        component: CostoOperacionUpdateComponent,
        resolve: {
            costoOperacion: CostoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoOperacionPopupRoute: Routes = [
    {
        path: 'costo-operacion/:id/delete',
        component: CostoOperacionDeletePopupComponent,
        resolve: {
            costoOperacion: CostoOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
