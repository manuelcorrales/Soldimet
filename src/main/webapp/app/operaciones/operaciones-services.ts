import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOListaPrecioManoDeObra } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class OperacionesService {
  private resourceUrlOperaciones = SERVER_API_URL + 'api/operaciones';
  private urlBuscarListasActivas = '/getListaPreciosOperacionesActualizada';
  private urlActualizarPrecioLista = '/updateLista';

  constructor(private http: HttpClient) {}

  getListasOperacionesAutorizadas(): Observable<DTOListaPrecioManoDeObra[]> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarListasActivas}`;
    return this.http.get<DTOListaPrecioManoDeObra[]>(urlLlamada);
  }
  saveListaActualizada(lista: DTOListaPrecioManoDeObra): Observable<DTOListaPrecioManoDeObra> {
    const urlLlamada = `${this.resourceUrlOperaciones}${this.urlActualizarPrecioLista}`;
    return this.http.post<DTOListaPrecioManoDeObra>(urlLlamada, lista);
  }
}
