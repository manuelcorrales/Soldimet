import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMRoutingResolveService implements Resolve<IListaPrecioRectificacionCRAM> {
  constructor(protected service: ListaPrecioRectificacionCRAMService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IListaPrecioRectificacionCRAM> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((listaPrecioRectificacionCRAM: HttpResponse<ListaPrecioRectificacionCRAM>) => {
          if (listaPrecioRectificacionCRAM.body) {
            return of(listaPrecioRectificacionCRAM.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ListaPrecioRectificacionCRAM());
  }
}
