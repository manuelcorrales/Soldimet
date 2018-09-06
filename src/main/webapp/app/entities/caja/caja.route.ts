import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Caja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja/caja.service';
import { CajaComponent } from 'app/entities/caja/caja.component';
import { CajaDetailComponent } from 'app/entities/caja/caja-detail.component';
import { CajaUpdateComponent } from 'app/entities/caja/caja-update.component';
import { CajaDeletePopupComponent } from 'app/entities/caja/caja-delete-dialog.component';
import { ICaja } from 'app/shared/model/caja.model';

@Injectable({ providedIn: 'root' })
export class CajaResolve implements Resolve<ICaja> {
    constructor(private service: CajaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((caja: HttpResponse<Caja>) => caja.body));
        }
        return of(new Caja());
    }
}

export const cajaRoute: Routes = [
    {
        path: 'caja',
        component: CajaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'caja/:id/view',
        component: CajaDetailComponent,
        resolve: {
            caja: CajaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'caja/new',
        component: CajaUpdateComponent,
        resolve: {
            caja: CajaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'caja/:id/edit',
        component: CajaUpdateComponent,
        resolve: {
            caja: CajaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cajaPopupRoute: Routes = [
    {
        path: 'caja/:id/delete',
        component: CajaDeletePopupComponent,
        resolve: {
            caja: CajaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
