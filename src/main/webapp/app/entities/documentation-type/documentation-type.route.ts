import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from './documentation-type.service';
import { DocumentationTypeComponent } from './documentation-type.component';
import { DocumentationTypeDetailComponent } from './documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from './documentation-type-update.component';
import { DocumentationTypeDeletePopupComponent } from './documentation-type-delete-dialog.component';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';

@Injectable({ providedIn: 'root' })
export class DocumentationTypeResolve implements Resolve<IDocumentationType> {
  constructor(private service: DocumentationTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentationType> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DocumentationType>) => response.ok),
        map((documentationType: HttpResponse<DocumentationType>) => documentationType.body)
      );
    }
    return of(new DocumentationType());
  }
}

export const documentationTypeRoute: Routes = [
  {
    path: '',
    component: DocumentationTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentationTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
