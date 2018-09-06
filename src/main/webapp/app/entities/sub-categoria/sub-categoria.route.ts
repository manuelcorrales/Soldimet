import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';
import { SubCategoriaComponent } from 'app/entities/sub-categoria/sub-categoria.component';
import { SubCategoriaDetailComponent } from 'app/entities/sub-categoria/sub-categoria-detail.component';
import { SubCategoriaUpdateComponent } from 'app/entities/sub-categoria/sub-categoria-update.component';
import { SubCategoriaDeletePopupComponent } from 'app/entities/sub-categoria/sub-categoria-delete-dialog.component';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';

@Injectable({ providedIn: 'root' })
export class SubCategoriaResolve implements Resolve<ISubCategoria> {
    constructor(private service: SubCategoriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subCategoria: HttpResponse<SubCategoria>) => subCategoria.body));
        }
        return of(new SubCategoria());
    }
}

export const subCategoriaRoute: Routes = [
    {
        path: 'sub-categoria',
        component: SubCategoriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categoria/:id/view',
        component: SubCategoriaDetailComponent,
        resolve: {
            subCategoria: SubCategoriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categoria/new',
        component: SubCategoriaUpdateComponent,
        resolve: {
            subCategoria: SubCategoriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categoria/:id/edit',
        component: SubCategoriaUpdateComponent,
        resolve: {
            subCategoria: SubCategoriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subCategoriaPopupRoute: Routes = [
    {
        path: 'sub-categoria/:id/delete',
        component: SubCategoriaDeletePopupComponent,
        resolve: {
            subCategoria: SubCategoriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
