import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStockArticulo, StockArticulo } from '../stock-articulo.model';
import { StockArticuloService } from '../service/stock-articulo.service';

@Injectable({ providedIn: 'root' })
export class StockArticuloRoutingResolveService implements Resolve<IStockArticulo> {
  constructor(protected service: StockArticuloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockArticulo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stockArticulo: HttpResponse<StockArticulo>) => {
          if (stockArticulo.body) {
            return of(stockArticulo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StockArticulo());
  }
}
