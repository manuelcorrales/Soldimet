import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';

type EntityResponseType = HttpResponse<IDocumentationType>;
type EntityArrayResponseType = HttpResponse<IDocumentationType[]>;

@Injectable({ providedIn: 'root' })
export class DocumentationTypeService {
  public resourceUrl = SERVER_API_URL + 'api/documentation-types';

  constructor(protected http: HttpClient) {}

  create(documentationType: IDocumentationType): Observable<EntityResponseType> {
    return this.http.post<IDocumentationType>(this.resourceUrl, documentationType, { observe: 'response' });
  }

  update(documentationType: IDocumentationType): Observable<EntityResponseType> {
    return this.http.put<IDocumentationType>(this.resourceUrl, documentationType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
