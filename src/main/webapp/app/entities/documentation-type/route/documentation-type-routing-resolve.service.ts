import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumentationType, DocumentationType } from '../documentation-type.model';
import { DocumentationTypeService } from '../service/documentation-type.service';

@Injectable({ providedIn: 'root' })
export class DocumentationTypeRoutingResolveService implements Resolve<IDocumentationType> {
  constructor(protected service: DocumentationTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentationType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((documentationType: HttpResponse<DocumentationType>) => {
          if (documentationType.body) {
            return of(documentationType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocumentationType());
  }
}
