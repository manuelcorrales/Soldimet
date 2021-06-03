import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'app/dto/page/page';
import { DTOStockRepuestoCabecera } from 'app/dto/dto-stock/dto-repuesto';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { Articulo } from 'app/shared/model/articulo.model';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';

@Injectable()
export class StockService {
  private resourceUrlStock = SERVER_API_URL + 'api/stock';
  private urlRepuestosCabecera = '/getStockCabecera';
  private urlUpdateStock = '/updateStock';
  private urlCheckStock = '/checkStock';

  constructor(private http: HttpClient) {}

  findByFilteredPage(text, page = 0, size = 15): Observable<Page<DTOStockRepuestoCabecera>> {
    let url = `${this.resourceUrlStock}${this.urlRepuestosCabecera}`;
    if (page != null) {
      url = `${this.resourceUrlStock}${this.urlRepuestosCabecera}/?page=${page}&size=${size}`;
    }
    if (text != null) {
      url += `&filtro=${text}`;
    }
    return this.http.get<Page<DTOStockRepuestoCabecera>>(url);
  }

  updateStockArticulo(repuesto: DTOStockRepuestoCabecera): Observable<DTOStockRepuestoCabecera> {
    const url = `${this.resourceUrlStock}${this.urlUpdateStock}`;
    return this.http.post<DTOStockRepuestoCabecera>(url, repuesto);
  }

  buscarStock(medida: MedidaArticulo, articulo: Articulo): Observable<StockArticulo> {
    const url = `${this.resourceUrlStock}${this.urlCheckStock}?medida_id=${medida.id}&articulo_id=${articulo.id}`;
    return this.http.get<StockArticulo>(url);
  }
}
