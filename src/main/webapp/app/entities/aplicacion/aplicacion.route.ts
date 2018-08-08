import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from './aplicacion.service';
import { AplicacionComponent } from './aplicacion.component';
import { AplicacionDetailComponent } from './aplicacion-detail.component';
import { AplicacionUpdateComponent } from './aplicacion-update.component';
import { AplicacionDeletePopupComponent } from './aplicacion-delete-dialog.component';
import { IAplicacion } from 'app/shared/model/aplicacion.model';

@Injectable({ providedIn: 'root' })
export class AplicacionResolve implements Resolve<IAplicacion> {
    constructor(private service: AplicacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((aplicacion: HttpResponse<Aplicacion>) => aplicacion.body));
        }
        return of(new Aplicacion());
    }
}

export const aplicacionRoute: Routes = [
    {
        path: 'aplicacion',
        component: AplicacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aplicacion/:id/view',
        component: AplicacionDetailComponent,
        resolve: {
            aplicacion: AplicacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aplicacion/new',
        component: AplicacionUpdateComponent,
        resolve: {
            aplicacion: AplicacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'aplicacion/:id/edit',
        component: AplicacionUpdateComponent,
        resolve: {
            aplicacion: AplicacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aplicacionPopupRoute: Routes = [
    {
        path: 'aplicacion/:id/delete',
        component: AplicacionDeletePopupComponent,
        resolve: {
            aplicacion: AplicacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
