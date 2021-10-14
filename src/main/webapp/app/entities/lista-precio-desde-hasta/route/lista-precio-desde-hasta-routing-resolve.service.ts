import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

@Injectable({ providedIn: 'root' })
export class ListaPrecioDesdeHastaRoutingResolveService implements Resolve<IListaPrecioDesdeHasta> {
  constructor(protected service: ListaPrecioDesdeHastaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IListaPrecioDesdeHasta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((listaPrecioDesdeHasta: HttpResponse<ListaPrecioDesdeHasta>) => {
          if (listaPrecioDesdeHasta.body) {
            return of(listaPrecioDesdeHasta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ListaPrecioDesdeHasta());
  }
}
