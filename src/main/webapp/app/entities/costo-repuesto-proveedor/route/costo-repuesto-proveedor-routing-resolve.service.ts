import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICostoRepuestoProveedor, CostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';

@Injectable({ providedIn: 'root' })
export class CostoRepuestoProveedorRoutingResolveService implements Resolve<ICostoRepuestoProveedor> {
  constructor(protected service: CostoRepuestoProveedorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICostoRepuestoProveedor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((costoRepuestoProveedor: HttpResponse<CostoRepuestoProveedor>) => {
          if (costoRepuestoProveedor.body) {
            return of(costoRepuestoProveedor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CostoRepuestoProveedor());
  }
}
