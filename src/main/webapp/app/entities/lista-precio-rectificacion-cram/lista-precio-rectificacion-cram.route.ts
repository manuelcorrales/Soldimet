import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAMComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-update.component';
import { ListaPrecioRectificacionCRAMDeletePopupComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-delete-dialog.component';
import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMResolve implements Resolve<IListaPrecioRectificacionCRAM> {
  constructor(private service: ListaPrecioRectificacionCRAMService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListaPrecioRectificacionCRAM> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ListaPrecioRectificacionCRAM>) => response.ok),
        map((listaPrecioRectificacionCRAM: HttpResponse<ListaPrecioRectificacionCRAM>) => listaPrecioRectificacionCRAM.body)
      );
    }
    return of(new ListaPrecioRectificacionCRAM());
  }
}

export const listaPrecioRectificacionCRAMRoute: Routes = [
  {
    path: '',
    component: ListaPrecioRectificacionCRAMComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioRectificacionCRAMS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
