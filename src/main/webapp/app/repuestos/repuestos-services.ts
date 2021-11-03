import { CostoRepuestoProveedor } from './../entities/costo-repuesto-proveedor/costo-repuesto-proveedor.model';
import { Marca } from './../entities/marca/marca.model';
import { Articulo } from './../entities/articulo/articulo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { Page } from '../dto/page/page';

@Injectable()
export class RepuestosService {
  private resourceUrlRepuestos = SERVER_API_URL + 'api/repuestos';
  private urlBuscarArticulos = '/buscarActivosDeTipoParte';
  private urlActualizarArticulosLista = '/updateLista';
  private urlActualizarArticulo = '/updateRepuestoProveedor';
  private urlCrearRepuestoPRoveedor = '/crearRepuestoProveedor';
  private urlFiltrarRepuestoPRoveedor = '/filtrarRepuestoProveedor';

  constructor(private http: HttpClient) {}

  findByFilteredPage(marca: Marca, text: string | null, page = 0, size = 15): Observable<Page<Articulo>> {
    let url = `${this.resourceUrlRepuestos}${this.urlBuscarArticulos}/?marca=${marca.id!}`;
    url += `&page=${page}&size=${size}`;

    if (text != null) {
      url += `&filtro=${text}`;
    }

    return this.http.get<Page<Articulo>>(url);
  }

  findRepuestoProveedorByFilter(text: string | null, page = 0, size = 15): Observable<Page<CostoRepuestoProveedor>> {
    let url = `${this.resourceUrlRepuestos}${this.urlFiltrarRepuestoPRoveedor}/?page=${page}&size=${size}`;

    if (text != null) {
      url += `&filtro=${text}`;
    }

    return this.http.get<Page<CostoRepuestoProveedor>>(url);
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
