import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';
import { TipoTarjetaComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta.component';
import { TipoTarjetaDetailComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta-detail.component';
import { TipoTarjetaUpdateComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta-update.component';
import { TipoTarjetaDeletePopupComponent } from 'app/entities/tipo-tarjeta/tipo-tarjeta-delete-dialog.component';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class TipoTarjetaResolve implements Resolve<ITipoTarjeta> {
    constructor(private service: TipoTarjetaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoTarjeta: HttpResponse<TipoTarjeta>) => tipoTarjeta.body));
        }
        return of(new TipoTarjeta());
    }
}

export const tipoTarjetaRoute: Routes = [
    {
        path: 'tipo-tarjeta',
        component: TipoTarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-tarjeta/:id/view',
        component: TipoTarjetaDetailComponent,
        resolve: {
            tipoTarjeta: TipoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-tarjeta/new',
        component: TipoTarjetaUpdateComponent,
        resolve: {
            tipoTarjeta: TipoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-tarjeta/:id/edit',
        component: TipoTarjetaUpdateComponent,
        resolve: {
            tipoTarjeta: TipoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoTarjetaPopupRoute: Routes = [
    {
        path: 'tipo-tarjeta/:id/delete',
        component: TipoTarjetaDeletePopupComponent,
        resolve: {
            tipoTarjeta: TipoTarjetaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
