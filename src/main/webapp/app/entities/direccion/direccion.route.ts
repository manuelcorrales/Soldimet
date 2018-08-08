import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Direccion } from 'app/shared/model/direccion.model';
import { DireccionService } from './direccion.service';
import { DireccionComponent } from './direccion.component';
import { DireccionDetailComponent } from './direccion-detail.component';
import { DireccionUpdateComponent } from './direccion-update.component';
import { DireccionDeletePopupComponent } from './direccion-delete-dialog.component';
import { IDireccion } from 'app/shared/model/direccion.model';

@Injectable({ providedIn: 'root' })
export class DireccionResolve implements Resolve<IDireccion> {
    constructor(private service: DireccionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((direccion: HttpResponse<Direccion>) => direccion.body));
        }
        return of(new Direccion());
    }
}

export const direccionRoute: Routes = [
    {
        path: 'direccion',
        component: DireccionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion/:id/view',
        component: DireccionDetailComponent,
        resolve: {
            direccion: DireccionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion/new',
        component: DireccionUpdateComponent,
        resolve: {
            direccion: DireccionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'direccion/:id/edit',
        component: DireccionUpdateComponent,
        resolve: {
            direccion: DireccionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direccionPopupRoute: Routes = [
    {
        path: 'direccion/:id/delete',
        component: DireccionDeletePopupComponent,
        resolve: {
            direccion: DireccionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
