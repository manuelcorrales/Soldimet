import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { DTODatosMotorComponent } from 'app/dto/dto-presupuesto-cabecera/DTODatosMotor';
import { MotorService } from 'app/entities/motor/motor.service';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { Motor } from 'app/shared/model/motor.model';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { Cliente } from 'app/shared/model/cliente.model';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { Observable } from 'rxjs';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { Articulo } from 'app/shared/model/articulo.model';
import { Page } from 'app/dto/page/page';

@Injectable()
export class PresupuestosService {
  private resourceUrlPresupuestos = SERVER_API_URL + 'api/presupuestos';
  private urlPresupuestoCabecera = '/getPresupuestos';
  private urlAplicaciones = '/getAplicaciones';
  private urlPresupuestoAplicaciones = '/getAplicacionByMotor/';
  private urlPresupuestoOperacionesCosto = '/getOperacionesPresupuesto';
  private urlPresupuestoClientesFiltro = '/getClientesByNombre/';
  private urlPresupuestoRepuestos = '/getRepuestos';
  private urlPresupuestoClientesAll = '/getAllClientes';
  private urlEstadoPrespuestoCreado = '/getEstadoPresupuestoCreado';
  private urlPresupuestoCostoRepuesto = '/getCostoRepuestoPresupuesto/';
  private urlSavePresupuesto = '/save';
  private urlAceptarPresupuesto = '/aceptar';
  private urlCancelarPresupuesto = '/cancelar';
  private urlTerminasPresupuesto = '/terminar';
  private urlEntregarPresupuesto = '/entregar';
  private urlPresupuestoVista = '/view';
  private urlImprimirPresupuesto = '/imprimir';
  private urlBuscarPresupuestoModelo = '/buscarModelo';
  private urlListaCostoRepuestoProveedores = '/buscarCostoRepuestoProveedores';
  private urlTodosRepuestos = '/buscarTodosRepuestos';
  private urlTiposPartesPresupuestos = '/buscarTiposPartesPresupuestos';

  constructor(private http: HttpClient, private motorService: MotorService, private cilindradaService: CilindradaService) {}

  getAllArticulos(): Observable<Articulo[]> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlTodosRepuestos}`;
    return this.http.get<Articulo[]>(urlLlamada);
  }

  savePresupuesto(presupuesto: Presupuesto): Observable<Presupuesto> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlSavePresupuesto}`;
    return this.http.post<Presupuesto>(urlLlamada, presupuesto);
  }

  getPresupuesto(id): Observable<Presupuesto> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoVista}/${id}`;
    return this.http.get<Presupuesto>(urlLlamada);
  }

  buscarPresupuestoViejo(aplicacionId, cilindradaId): Observable<Presupuesto> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlBuscarPresupuestoModelo}/?aplicacion=${aplicacionId}&cilindrada=${cilindradaId}`;
    return this.http.get<Presupuesto>(urlLlamada);
  }

  aceptarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
    const url = `${this.resourceUrlPresupuestos}${this.urlAceptarPresupuesto}`;
    return this.http.post<DtoPresupuestoCabeceraComponent>(url, dtoPresupuesto);
  }

  cancelarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
    const url = `${this.resourceUrlPresupuestos}${this.urlCancelarPresupuesto}`;
    return this.http.post<DtoPresupuestoCabeceraComponent>(url, dtoPresupuesto);
  }

  terminarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
    const url = `${this.resourceUrlPresupuestos}${this.urlTerminasPresupuesto}`;
    return this.http.post<DtoPresupuestoCabeceraComponent>(url, dtoPresupuesto);
  }

  entregarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
    const url = `${this.resourceUrlPresupuestos}${this.urlEntregarPresupuesto}`;
    return this.http.post<DtoPresupuestoCabeceraComponent>(url, dtoPresupuesto);
  }

  findByFilteredPage(
    text,
    estadoPresupuesto: number = null,
    modelo = false,
    page = 0,
    size = 15
  ): Observable<Page<DtoPresupuestoCabeceraComponent>> {
    let url = `${this.resourceUrlPresupuestos}${this.urlPresupuestoCabecera}`;
    if (page != null) {
      url = `${this.resourceUrlPresupuestos}${this.urlPresupuestoCabecera}/?page=${page}&size=${size}`;
    }
    if (text != null) {
      url += `&filtro=${text}`;
    }
    if (estadoPresupuesto != null) {
      url += `&estado=${estadoPresupuesto}`;
    }
    if (modelo != null) {
      url += `&modelo=${modelo}`;
    }
    return this.http.get<Page<DtoPresupuestoCabeceraComponent>>(url);
  }

  findByFilteredPageAplicaciones(text, page = 0, size = 15): Observable<Page<Aplicacion>> {
    let url = `${this.resourceUrlPresupuestos}${this.urlAplicaciones}`;
    if (page != null) {
      url = `${this.resourceUrlPresupuestos}${this.urlAplicaciones}/?page=${page}&size=${size}`;
    }
    if (text != null) {
      url += `&filtro=${text}`;
    }
    return this.http.get<Page<Aplicacion>>(url);
  }

  imprimirPresupuesto(id: number): Observable<Blob> {
    return this.http.get<Blob>(
      `${this.resourceUrlPresupuestos}${this.urlImprimirPresupuesto}/${id}`,
      { responseType: 'blob' as 'json' } // eslint-disable-line object-shorthand
    );
  }
  findAplicacionesPorMotor(motor: Motor): Observable<Aplicacion[]> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoAplicaciones}${motor.id}`;
    return this.http.get<Aplicacion[]>(urlLlamada);
  }

  findOperacionesPresupuesto(datos: DTODatosMotorComponent): Observable<CostoOperacion[]> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoOperacionesCosto}?idMotor=${datos.idMotor}&idCilindrada=${datos.idCilindrada}&idAplicacion=${datos.idAplicacion}&idTiposPartesMotores=${datos.idTiposPartesMotores}`;
    return this.http.get<CostoOperacion[]>(urlLlamada);
  }

  findCostoRepuestoPresupuesto(presupuestoId): Observable<CostoRepuesto[]> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoCostoRepuesto}${presupuestoId}`;
    return this.http.get<CostoRepuesto[]>(urlLlamada);
  }

  buscarEstadoCreado(): Observable<EstadoPresupuesto> {
    const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlEstadoPrespuestoCreado}`;
    return this.http.get<EstadoPresupuesto>(urlLlamada);
  }

  findClientesByNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesFiltro}${nombre}`);
  }

  findAllActiveClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesAll}`);
  }

  buscarMotores(): Motor[] {
    const arreglo: Motor[] = [];
    this.motorService.query().subscribe((res: HttpResponse<Motor[]>) => {
      arreglo.push(...this.convertJsonAMotor(res));
    });
    return arreglo;
  }

  buscarCilindradas(): Cilindrada[] {
    const arreglo: Cilindrada[] = [];
    this.cilindradaService.query().subscribe((res: HttpResponse<Cilindrada[]>) => {
      arreglo.push(...this.convertJsonACilindrada(res));
    });
    return arreglo;
  }

  buscarTiposPartes(): Observable<TipoParteMotor[]> {
    return this.http.get<TipoParteMotor[]>(`${this.resourceUrlPresupuestos}${this.urlTiposPartesPresupuestos}`);
  }

  buscarRepuestos(detalle: DetallePresupuesto): Observable<TipoRepuesto[]> {
    const url = `${this.resourceUrlPresupuestos}${this.urlPresupuestoRepuestos}/${detalle.tipoParteMotor.id}`;
    return this.http.get<TipoRepuesto[]>(url);
  }

  buscarListaCobranzaRepuestos(aplicacionId, cilindradaId, tipoParteMotorId): Observable<CostoRepuestoProveedor[]> {
    const url = `${this.resourceUrlPresupuestos}${this.urlListaCostoRepuestoProveedores}/?aplicacion=${aplicacionId}&cilindrada=${cilindradaId}&tipoParteMotor=${tipoParteMotorId}`;
    return this.http.get<CostoRepuestoProveedor[]>(url);
  }

  convertJsonAPresupuestoCabecera(json: any): DtoPresupuestoCabeceraComponent[] {
    const arreglo: DtoPresupuestoCabeceraComponent[] = [];
    json.forEach(elemento => {
      const entity: DtoPresupuestoCabeceraComponent = Object.assign(new DtoPresupuestoCabeceraComponent(), elemento);
      // entity.fecha = this.dateUtils
      //     .convertLocalDateFromServer(json.fecha);
      arreglo.push(entity);
    });
    return arreglo || [];
  }

  convertJsonAAplicacion(json: any): Aplicacion[] {
    const arreglo: Aplicacion[] = [];
    json.forEach(elemento => {
      const entity: Aplicacion = Object.assign(new Aplicacion(), elemento);
      arreglo.push(entity);
    });
    return arreglo;
  }

  convertJsonAPArejaCostoOperacion(json: any): CostoOperacion[] {
    const arreglo: CostoOperacion[] = [];
    json.forEach(elemento => {
      const entity: CostoOperacion = Object.assign(new CostoOperacion(), elemento);
      arreglo.push(entity);
    });
    return arreglo;
  }

  convertJsonACliente(json: any): Cliente[] {
    const arreglo: Cliente[] = [];
    json.forEach(elemento => {
      const entity: Cliente = Object.assign(new Cliente(), elemento);
      arreglo.push(entity);
    });
    return arreglo || [];
  }

  convertJsonAMotor(res: HttpResponse<Motor[]>): Motor[] {
    const arreglo: Motor[] = [];
    res.body.forEach(elemento => {
      const entity: Motor = Object.assign(new Motor(), elemento);
      arreglo.push(entity);
    });
    return arreglo || [];
  }

  convertJsonATipoParteMotor(res: HttpResponse<TipoParteMotor[]>): TipoParteMotor[] {
    const arreglo: TipoParteMotor[] = [];
    res.body.forEach(elemento => {
      const entity: TipoParteMotor = Object.assign(new TipoParteMotor(), elemento);
      arreglo.push(entity);
    });
    return arreglo || [];
  }

  convertJsonACilindrada(res: HttpResponse<Cilindrada[]>): Cilindrada[] {
    const arreglo: Cilindrada[] = [];
    res.body.forEach(elemento => {
      const entity: Cilindrada = Object.assign(new Cilindrada(), elemento);
      arreglo.push(entity);
    });
    return arreglo || [];
  }

  convertJsonToTipoRepuesto(json: any): TipoRepuesto[] {
    const arreglo: TipoRepuesto[] = [];
    json.forEach(elemento => {
      const entity: TipoRepuesto = Object.assign(new TipoRepuesto(), elemento);
      arreglo.push(entity);
    });
    return arreglo;
  }

  convertJsonAEstadoPresupuesto(json: any): EstadoPresupuesto {
    return Object.assign(new EstadoPresupuesto(), json);
  }
}
