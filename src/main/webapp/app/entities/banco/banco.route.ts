import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banco } from 'app/shared/model/banco.model';
import { BancoService } from './banco.service';
import { BancoComponent } from './banco.component';
import { BancoDetailComponent } from './banco-detail.component';
import { BancoUpdateComponent } from './banco-update.component';
import { BancoDeletePopupComponent } from './banco-delete-dialog.component';
import { IBanco } from 'app/shared/model/banco.model';

@Injectable({ providedIn: 'root' })
export class BancoResolve implements Resolve<IBanco> {
    constructor(private service: BancoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((banco: HttpResponse<Banco>) => banco.body));
        }
        return of(new Banco());
    }
}

export const bancoRoute: Routes = [
    {
        path: 'banco',
        component: BancoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banco/:id/view',
        component: BancoDetailComponent,
        resolve: {
            banco: BancoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banco/new',
        component: BancoUpdateComponent,
        resolve: {
            banco: BancoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'banco/:id/edit',
        component: BancoUpdateComponent,
        resolve: {
            banco: BancoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bancoPopupRoute: Routes = [
    {
        path: 'banco/:id/delete',
        component: BancoDeletePopupComponent,
        resolve: {
            banco: BancoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
