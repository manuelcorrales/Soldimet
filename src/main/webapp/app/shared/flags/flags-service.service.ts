import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { DtoFF } from './dto-ff';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlagsServiceService {
  private resourceUrlPresupuestos = SERVER_API_URL + '/api/ff4j';
  private urlFeatureStore = '/store/features/';

  constructor(private http: HttpClient) {}

  getFFStore(): Observable<DtoFF[]> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlFeatureStore}`;
    return this.http.get<DtoFF[]>(urlLlamada);
  }
}
