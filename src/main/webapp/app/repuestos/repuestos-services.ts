import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Articulo } from 'app/shared/model/articulo.model';

@Injectable()
export class RepuestosService {
  private resourceUrlRepuestos = SERVER_API_URL + 'api/repuestos';
  private urlBuscarArticulos = '/buscarActivosDeTipoParte';
  private urlActualizarArticulosLista = '/updateLista';
  private urlActualizarArticulo = '/updateRepuestoProveedor';
  private urlCrearRepuestoPRoveedor = '/crearRepuestoProveedor';

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<Articulo[]> {
    const urlLlamada = `${this.resourceUrlRepuestos}${this.urlBuscarArticulos}`;
    return this.http.get<Articulo[]>(urlLlamada);
  }

  crearRepuestoProveedor(articulo: Articulo): Observable<Articulo> {
    const urlLlamada = `${this.resourceUrlRepuestos}${this.urlCrearRepuestoPRoveedor}`;
    return this.http.post<Articulo>(urlLlamada, articulo);
  }

  actualizarRepuestoProveedor(articulo: Articulo): Observable<Articulo> {
    const urlLlamada = `${this.resourceUrlRepuestos}${this.urlActualizarArticulo}`;
    return this.http.post<Articulo>(urlLlamada, articulo);
  }

  saveListaActualizada(lista: Articulo[]): Observable<Articulo[]> {
    const urlLlamada = `${this.resourceUrlRepuestos}${this.urlActualizarArticulosLista}`;
    return this.http.post<Articulo[]>(urlLlamada, lista);
  }
}
