import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { CobranzaRepuestoComponent } from './cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from './cobranza-repuesto-detail.component';
import { CobranzaRepuestoUpdateComponent } from './cobranza-repuesto-update.component';
import { CobranzaRepuestoDeletePopupComponent } from './cobranza-repuesto-delete-dialog.component';
import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoResolve implements Resolve<ICobranzaRepuesto> {
    constructor(private service: CobranzaRepuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cobranzaRepuesto: HttpResponse<CobranzaRepuesto>) => cobranzaRepuesto.body));
        }
        return of(new CobranzaRepuesto());
    }
}

export const cobranzaRepuestoRoute: Routes = [
    {
        path: 'cobranza-repuesto',
        component: CobranzaRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-repuesto/:id/view',
        component: CobranzaRepuestoDetailComponent,
        resolve: {
            cobranzaRepuesto: CobranzaRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-repuesto/new',
        component: CobranzaRepuestoUpdateComponent,
        resolve: {
            cobranzaRepuesto: CobranzaRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cobranza-repuesto/:id/edit',
        component: CobranzaRepuestoUpdateComponent,
        resolve: {
            cobranzaRepuesto: CobranzaRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobranzaRepuestoPopupRoute: Routes = [
    {
        path: 'cobranza-repuesto/:id/delete',
        component: CobranzaRepuestoDeletePopupComponent,
        resolve: {
            cobranzaRepuesto: CobranzaRepuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
