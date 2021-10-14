import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DocumentationTypeComponent } from '../list/documentation-type.component';
import { DocumentationTypeDetailComponent } from '../detail/documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from '../update/documentation-type-update.component';
import { DocumentationTypeRoutingResolveService } from './documentation-type-routing-resolve.service';

const documentationTypeRoute: Routes = [
  {
    path: '',
    component: DocumentationTypeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentationTypeDetailComponent,
    resolve: {
      documentationType: DocumentationTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentationTypeUpdateComponent,
    resolve: {
      documentationType: DocumentationTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentationTypeUpdateComponent,
    resolve: {
      documentationType: DocumentationTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentationTypeRoute)],
  exports: [RouterModule],
})
export class DocumentationTypeRoutingModule {}
