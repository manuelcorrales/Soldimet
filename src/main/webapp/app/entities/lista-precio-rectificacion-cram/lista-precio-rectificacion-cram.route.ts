import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAMComponent } from './lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from './lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from './lista-precio-rectificacion-cram-update.component';
import { ListaPrecioRectificacionCRAMDeletePopupComponent } from './lista-precio-rectificacion-cram-delete-dialog.component';
import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMResolve implements Resolve<IListaPrecioRectificacionCRAM> {
    constructor(private service: ListaPrecioRectificacionCRAMService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((listaPrecioRectificacionCRAM: HttpResponse<ListaPrecioRectificacionCRAM>) => listaPrecioRectificacionCRAM.body));
        }
        return of(new ListaPrecioRectificacionCRAM());
    }
}

export const listaPrecioRectificacionCRAMRoute: Routes = [
    {
        path: 'lista-precio-rectificacion-cram',
        component: ListaPrecioRectificacionCRAMComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-rectificacion-cram/:id/view',
        component: ListaPrecioRectificacionCRAMDetailComponent,
        resolve: {
            listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-rectificacion-cram/new',
        component: ListaPrecioRectificacionCRAMUpdateComponent,
        resolve: {
            listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lista-precio-rectificacion-cram/:id/edit',
        component: ListaPrecioRectificacionCRAMUpdateComponent,
        resolve: {
            listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listaPrecioRectificacionCRAMPopupRoute: Routes = [
    {
        path: 'lista-precio-rectificacion-cram/:id/delete',
        component: ListaPrecioRectificacionCRAMDeletePopupComponent,
        resolve: {
            listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
