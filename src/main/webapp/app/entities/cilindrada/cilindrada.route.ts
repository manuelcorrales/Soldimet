import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { CilindradaComponent } from 'app/entities/cilindrada/cilindrada.component';
import { CilindradaDetailComponent } from 'app/entities/cilindrada/cilindrada-detail.component';
import { CilindradaUpdateComponent } from 'app/entities/cilindrada/cilindrada-update.component';
import { CilindradaDeletePopupComponent } from 'app/entities/cilindrada/cilindrada-delete-dialog.component';
import { ICilindrada } from 'app/shared/model/cilindrada.model';

@Injectable({ providedIn: 'root' })
export class CilindradaResolve implements Resolve<ICilindrada> {
    constructor(private service: CilindradaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cilindrada: HttpResponse<Cilindrada>) => cilindrada.body));
        }
        return of(new Cilindrada());
    }
}

export const cilindradaRoute: Routes = [
    {
        path: 'cilindrada',
        component: CilindradaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cilindrada/:id/view',
        component: CilindradaDetailComponent,
        resolve: {
            cilindrada: CilindradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cilindrada/new',
        component: CilindradaUpdateComponent,
        resolve: {
            cilindrada: CilindradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cilindrada/:id/edit',
        component: CilindradaUpdateComponent,
        resolve: {
            cilindrada: CilindradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cilindradaPopupRoute: Routes = [
    {
        path: 'cilindrada/:id/delete',
        component: CilindradaDeletePopupComponent,
        resolve: {
            cilindrada: CilindradaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
