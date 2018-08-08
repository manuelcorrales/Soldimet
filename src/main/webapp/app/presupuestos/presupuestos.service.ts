import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';
import { DtoPresupuestoCabeceraComponent } from '../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { DTODatosMotorComponent } from '../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { DTOParOperacionPresupuestoComponent } from '../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { MotorService } from '../entities/motor/motor.service';
import { AplicacionService } from '../entities/aplicacion/aplicacion.service';
import { TipoParteMotorService } from '../entities/tipo-parte-motor/tipo-parte-motor.service';
import { CilindradaService } from '../entities/cilindrada/cilindrada.service';
import { TipoParteMotor } from '../entities/tipo-parte-motor/tipo-parte-motor.model';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { Motor } from 'app/shared/model/motor.model';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { CostoOperacion } from 'app/entities/costo-operacion/costo-operacion.model';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { Cliente } from 'app/shared/model/cliente.model';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { DetallePresupuesto } from 'app/entities/detalle-presupuesto/detalle-presupuesto.model';
import { TipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';

@Injectable()
export class PresupuestosService {
    private resourceUrlPresupuestos = SERVER_API_URL + 'api/presupuestos';
    private urlPresupuestoCabecera = '/getPresupuestos';
    private urlPresupuestoAplicaciones = '/getAplicacionByMotor/';
    private urlPresupuestoOperacionesCosto = '/getOperacionesPresupuesto';
    private urlPresupuestoClientesFiltro = '/getClientesByNombre/';
    private urlPresupuestoRepuestos = '/getRepuestos';
    private urlPresupuestoClientesAll = '/getAllClientes';
    private urlEstadoPrespuestoCreado = '/getEstadoPresupuestoCreado';
    private urlSavePresupuesto = '/save';
    private urlAceptarPresupuesto = '/aceptar';
    private urlCancelarPresupuesto = '/cancelar';

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        private motorService: MotorService,
        private tipoParteService: TipoParteMotorService,
        private cilindradaService: CilindradaService
    ) {}

    savePresupuesto(presupuesto: Presupuesto): Observable<Presupuesto> {
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlSavePresupuesto}`;
        console.log(presupuesto);
        return this.http.post(urlLlamada, presupuesto).map((res: Response) => {
            const jsonResponse = res.json();
            console.log(res);
            return this.convertJsonAPresupuesto(jsonResponse);
        });
    }

    aceptarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
        const url = `${this.resourceUrlPresupuestos}${this.urlAceptarPresupuesto}`;
        return this.http.post(url, dtoPresupuesto).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPresupuestoCabecera([jsonResponse])[0];
        });
    }

    cancelarPresupuesto(dtoPresupuesto: DtoPresupuestoCabeceraComponent): Observable<DtoPresupuestoCabeceraComponent> {
        const url = `${this.resourceUrlPresupuestos}${this.urlCancelarPresupuesto}`;
        return this.http.post(url, dtoPresupuesto).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPresupuestoCabecera([jsonResponse])[0];
        });
    }

    findPresupuestoCabecera(): Observable<DtoPresupuestoCabeceraComponent[]> {
        return this.http.get(`${this.resourceUrlPresupuestos}` + this.urlPresupuestoCabecera).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPresupuestoCabecera(jsonResponse);
        });
    }

    findAplicacionesPorMotor(motor: Motor): Observable<Aplicacion[]> {
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoAplicaciones}${motor.id}`;
        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAAplicacion(jsonResponse);
        });
    }

    findOperacionesPresupuesto(datos: DTODatosMotorComponent): Observable<CostoOperacion[]> {
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoOperacionesCosto}?idMotor=${datos.idMotor}&idCilindrada=${
            datos.idCilindrada
        }&idAplicacion=${datos.idAplicacion}&idTiposPartesMotores=${datos.idTiposPartesMotores}`;
        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPArejaCostoOperacion(jsonResponse);
        });
    }

    buscarEstadoCreado(): Observable<EstadoPresupuesto> {
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlEstadoPrespuestoCreado}`;
        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAEstadoPresupuesto(jsonResponse);
        });
    }

    findClientesByNombre(nombre: string): Observable<Cliente[]> {
        return this.http.get(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesFiltro}${nombre}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonACliente(jsonResponse);
        });
    }

    findAllClientes(): Observable<Cliente[]> {
        return this.http.get(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesAll}`).map((res: HttpResponse<Cliente>) => {
            return <Cliente[]>res.body;
        });
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

    buscarTiposPartes(): TipoParteMotor[] {
        const arreglo: TipoParteMotor[] = [];
        this.tipoParteService.query().subscribe((res: HttpResponse<TipoParteMotor[]>) => {
            arreglo.push(...this.convertJsonATipoParteMotor(res));
        });
        return arreglo;
    }

    buscarRepuestos(detalle: DetallePresupuesto): Observable<TipoRepuesto[]> {
        const url = `${this.resourceUrlPresupuestos}${this.urlPresupuestoRepuestos}/${detalle.tipoParteMotor.id}`;
        return this.http.get(url).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonToTipoRepuesto(jsonResponse);
        });
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

    private convertPresupuestoAJson(presupuesto: Presupuesto): Presupuesto {
        const copy: Presupuesto = Object.assign({}, presupuesto);
        // if (presupuesto.fechaCreacion) {
        //     copy.fechaCreacion = this.dateUtils.convertLocalDateToServer(presupuesto.fechaCreacion);
        // }
        // if (presupuesto.fechaAceptado) {
        //     copy.fechaAceptado = this.dateUtils.convertLocalDateToServer(presupuesto.fechaAceptado);
        // }
        // if (presupuesto.fechaEntregado) {
        //     copy.fechaEntregado = this.dateUtils.convertLocalDateToServer(presupuesto.fechaEntregado);
        // }
        return copy;
    }

    private convertJsonAPresupuesto(json: any): Presupuesto {
        const entity: Presupuesto = Object.assign(new Presupuesto(), json);
        // entity.fechaCreacion = this.dateUtils.convertLocalDateFromServer(json.fechaCreacion);
        // entity.fechaAceptado = this.dateUtils.convertLocalDateFromServer(json.fechaAceptado);
        // entity.fechaEntregado = this.dateUtils.convertLocalDateFromServer(json.fechaEntregado);
        return entity;
    }
}
