import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';
import { DocumentationTypeComponent } from 'app/entities/documentation-type/documentation-type.component';
import { DocumentationTypeDetailComponent } from 'app/entities/documentation-type/documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from 'app/entities/documentation-type/documentation-type-update.component';
import { DocumentationTypeDeletePopupComponent } from 'app/entities/documentation-type/documentation-type-delete-dialog.component';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';

@Injectable({ providedIn: 'root' })
export class DocumentationTypeResolve implements Resolve<IDocumentationType> {
    constructor(private service: DocumentationTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((documentationType: HttpResponse<DocumentationType>) => documentationType.body));
        }
        return of(new DocumentationType());
    }
}

export const documentationTypeRoute: Routes = [
    {
        path: 'documentation-type',
        component: DocumentationTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentationTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentation-type/:id/view',
        component: DocumentationTypeDetailComponent,
        resolve: {
            documentationType: DocumentationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentationTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentation-type/new',
        component: DocumentationTypeUpdateComponent,
        resolve: {
            documentationType: DocumentationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentationTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'documentation-type/:id/edit',
        component: DocumentationTypeUpdateComponent,
        resolve: {
            documentationType: DocumentationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentationTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentationTypePopupRoute: Routes = [
    {
        path: 'documentation-type/:id/delete',
        component: DocumentationTypeDeletePopupComponent,
        resolve: {
            documentationType: DocumentationTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
