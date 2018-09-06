import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHastaComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaUpdateComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-update.component';
import { ListaPrecioDesdeHastaDeletePopupComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-delete-dialog.component';
import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

@Injectable({ providedIn: 'root' })
export class ListaPrecioDesdeHastaResolve implements Resolve<IListaPrecioDesdeHasta> {
    constructor(private service: ListaPrecioDesdeHastaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((listaPrecioDesdeHasta: HttpResponse<ListaPrecioDesdeHasta>) => listaPrecioDesdeHasta.body));
        }
        return of(new ListaPrecioDesdeHasta());
    }
}

export const listaPrecioDesdeHastaRoute: Routes = [
    {
        path: 'lista-precio-desde-hasta',
        component: ListaPrecioDesdeHastaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-desde-hasta/:id/view',
        component: ListaPrecioDesdeHastaDetailComponent,
        resolve: {
            listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-desde-hasta/new',
        component: ListaPrecioDesdeHastaUpdateComponent,
        resolve: {
            listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-desde-hasta/:id/edit',
        component: ListaPrecioDesdeHastaUpdateComponent,
        resolve: {
            listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listaPrecioDesdeHastaPopupRoute: Routes = [
    {
        path: 'lista-precio-desde-hasta/:id/delete',
        component: ListaPrecioDesdeHastaDeletePopupComponent,
        resolve: {
            listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
