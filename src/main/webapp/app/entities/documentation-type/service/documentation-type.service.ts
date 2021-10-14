import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentationType, getDocumentationTypeIdentifier } from '../documentation-type.model';

export type EntityResponseType = HttpResponse<IDocumentationType>;
export type EntityArrayResponseType = HttpResponse<IDocumentationType[]>;

@Injectable({ providedIn: 'root' })
export class DocumentationTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documentation-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(documentationType: IDocumentationType): Observable<EntityResponseType> {
    return this.http.post<IDocumentationType>(this.resourceUrl, documentationType, { observe: 'response' });
  }

  update(documentationType: IDocumentationType): Observable<EntityResponseType> {
    return this.http.put<IDocumentationType>(
      `${this.resourceUrl}/${getDocumentationTypeIdentifier(documentationType) as number}`,
      documentationType,
      { observe: 'response' }
    );
  }

  partialUpdate(documentationType: IDocumentationType): Observable<EntityResponseType> {
    return this.http.patch<IDocumentationType>(
      `${this.resourceUrl}/${getDocumentationTypeIdentifier(documentationType) as number}`,
      documentationType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDocumentationTypeToCollectionIfMissing(
    documentationTypeCollection: IDocumentationType[],
    ...documentationTypesToCheck: (IDocumentationType | null | undefined)[]
  ): IDocumentationType[] {
    const documentationTypes: IDocumentationType[] = documentationTypesToCheck.filter(isPresent);
    if (documentationTypes.length > 0) {
      const documentationTypeCollectionIdentifiers = documentationTypeCollection.map(
        documentationTypeItem => getDocumentationTypeIdentifier(documentationTypeItem)!
      );
      const documentationTypesToAdd = documentationTypes.filter(documentationTypeItem => {
        const documentationTypeIdentifier = getDocumentationTypeIdentifier(documentationTypeItem);
        if (documentationTypeIdentifier == null || documentationTypeCollectionIdentifiers.includes(documentationTypeIdentifier)) {
          return false;
        }
        documentationTypeCollectionIdentifiers.push(documentationTypeIdentifier);
        return true;
      });
      return [...documentationTypesToAdd, ...documentationTypeCollection];
    }
    return documentationTypeCollection;
  }
}
