import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { CobranzaOperacionComponent } from './cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from './cobranza-operacion-detail.component';
import { CobranzaOperacionUpdateComponent } from './cobranza-operacion-update.component';
import { CobranzaOperacionDeletePopupComponent } from './cobranza-operacion-delete-dialog.component';
import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

@Injectable({ providedIn: 'root' })
export class CobranzaOperacionResolve implements Resolve<ICobranzaOperacion> {
    constructor(private service: CobranzaOperacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cobranzaOperacion: HttpResponse<CobranzaOperacion>) => cobranzaOperacion.body));
        }
        return of(new CobranzaOperacion());
    }
}

export const cobranzaOperacionRoute: Routes = [
    {
        path: 'cobranza-operacion',
        component: CobranzaOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-operacion/:id/view',
        component: CobranzaOperacionDetailComponent,
        resolve: {
            cobranzaOperacion: CobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-operacion/new',
        component: CobranzaOperacionUpdateComponent,
        resolve: {
            cobranzaOperacion: CobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-operacion/:id/edit',
        component: CobranzaOperacionUpdateComponent,
        resolve: {
            cobranzaOperacion: CobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobranzaOperacionPopupRoute: Routes = [
    {
        path: 'cobranza-operacion/:id/delete',
        component: CobranzaOperacionDeletePopupComponent,
        resolve: {
            cobranzaOperacion: CobranzaOperacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
