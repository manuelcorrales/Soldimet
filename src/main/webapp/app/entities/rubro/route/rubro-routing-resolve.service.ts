import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRubro, Rubro } from '../rubro.model';
import { RubroService } from '../service/rubro.service';

@Injectable({ providedIn: 'root' })
export class RubroRoutingResolveService implements Resolve<IRubro> {
  constructor(protected service: RubroService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRubro> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rubro: HttpResponse<Rubro>) => {
          if (rubro.body) {
            return of(rubro.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Rubro());
  }
}
