import { Injectable } from '@angular/core';
import { SERVER_API_URL } from "../app.constants";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from "ng-jhipster";
import { DtoPresupuestoCabeceraComponent } from "../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component";
import { Aplicacion } from "../entities/aplicacion/aplicacion.model";
import { Motor } from "../entities/motor/motor.model";
import { DTODatosMotorComponent } from '../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { DTOParOperacionPresupuestoComponent } from "../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto";
import { Cliente } from "../entities/cliente/cliente.model";
import { MotorService } from "../entities/motor/motor.service";
import { AplicacionService } from "../entities/aplicacion/aplicacion.service";
import { TipoParteMotorService } from "../entities/tipo-parte-motor/tipo-parte-motor.service";
import { CilindradaService } from "../entities/cilindrada/cilindrada.service";
import { Cilindrada } from "../entities/cilindrada/cilindrada.model";
import { TipoParteMotor } from "../entities/tipo-parte-motor/tipo-parte-motor.model";
import { ResponseWrapper } from "../shared/model/response-wrapper.model";
import { HttpClient } from "@angular/common/http";
import { Articulo } from '../entities/articulo';

@Injectable()
export class PresupuestosService {

    private resourceUrlPresupuestos = SERVER_API_URL + 'api/presupuestos';
    private urlPresupuestoCabecera = '/getPresupuestos';
    private urlPresupuestoAplicaciones = '/getAplicacionByMotor/';
    private urlPresupuestoOperacionesCosto = '/getOperacionesPresupuesto';
    private urlPresupuestoClientesFiltro = '/getClientesByNombre/';
    private urlPresupuestoRepuestos = '/getRepuestos';
    private urlPresupuestoClientesAll = '/getAllClientes';

    constructor(private http: Http,
        private httpNuevo: HttpClient,
        private dateUtils: JhiDateUtils,
        private motorService: MotorService,
        private aplicacionService: AplicacionService,
        private tipoParteService: TipoParteMotorService,
        private cilindradaService: CilindradaService) {
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

    findOperacionesPresupuesto(datos: DTODatosMotorComponent): Observable<DTOParOperacionPresupuestoComponent[]> {
        let body = JSON.stringify(datos);
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoOperacionesCosto}?idMotor=${datos.idMotor}&idCilindrada=${datos.idCilindrada}&idAplicacion=${datos.idAplicacion}&idTiposPartesMotores=${datos.idTiposPartesMotores}`;
        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPArejaCostoOperacion(jsonResponse);
        });
    }

    findClientesByNombre(nombre: string): Observable<Cliente[]> {
        return this.http.get(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesFiltro}${nombre}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonACliente(jsonResponse);
        });
    }

    findAllClientes(): Observable<Cliente[]>{
        return this.http.get(`${this.resourceUrlPresupuestos}${this.urlPresupuestoClientesAll}`)
            .map((res: Response) => {
                return <Cliente[]> res.json();
        });
    }

    buscarMotores(): Motor[] {
        let arreglo: Motor[] = [];
        this.motorService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonAMotor(res))
        });
        return arreglo;
    }

    buscarCilindradas(): Cilindrada[] {
        let arreglo: Cilindrada[] = [];
        this.cilindradaService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonACilindrada(res))
        });
        return arreglo;
    }

    buscarTiposPartes(): TipoParteMotor[] {
        let arreglo: TipoParteMotor[] = [];
        this.tipoParteService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonATipoParteMotor(res))
        });
        return arreglo;
    }

    buscarRepuestos(): Observable<Articulo[]> {
        const url = `${this.resourceUrlPresupuestos}` + this.urlPresupuestoRepuestos;
        return this.http.get(url).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAArticulo(jsonResponse);
        });
    }

    convertJsonAPresupuestoCabecera(json: any): DtoPresupuestoCabeceraComponent[] {
        let arreglo: DtoPresupuestoCabeceraComponent[] = [];
        json.forEach((elemento) => {
            const entity: DtoPresupuestoCabeceraComponent =
                Object.assign(new DtoPresupuestoCabeceraComponent(), json);
            entity.fecha = this.dateUtils
                .convertLocalDateFromServer(json.fecha);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonAAplicacion(json: any): Aplicacion[] {
        let arreglo: Aplicacion[] = [];
        json.forEach((elemento) => {
            const entity: Aplicacion =
                Object.assign(new Aplicacion(), elemento);
            arreglo.push(entity);
        })
        return arreglo;
    }

    convertJsonAPArejaCostoOperacion(json: any): DTOParOperacionPresupuestoComponent[] {
        let arreglo: DTOParOperacionPresupuestoComponent[] = [];
        json.forEach((elemento) => {
            const entity: DTOParOperacionPresupuestoComponent =
                Object.assign(new DTOParOperacionPresupuestoComponent(), elemento);
            arreglo.push(entity);
        })
        return arreglo;
    }

    convertJsonACliente(json: any): Cliente[] {
        let arreglo: Cliente[] = [];
        json.forEach((elemento) => {
            const entity: Cliente =
                Object.assign(new Cliente(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonAMotor(res: ResponseWrapper): Motor[] {
        let arreglo: Motor[] = [];
        res.json.forEach((elemento) => {
            const entity: Motor =
                Object.assign(new Motor(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonATipoParteMotor(res: ResponseWrapper): TipoParteMotor[] {
        let arreglo: TipoParteMotor[] = [];
        res.json.forEach((elemento) => {
            const entity: TipoParteMotor =
                Object.assign(new TipoParteMotor(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonACilindrada(res: ResponseWrapper): Cilindrada[] {
        let arreglo: Cilindrada[] = [];
        res.json.forEach((elemento) => {
            const entity: Cilindrada =
                Object.assign(new Cilindrada(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonAArticulo(json: any): Articulo[] {
        let arreglo: Articulo[] = [];
        json.forEach((elemento) => {
            const entity: Articulo =
                Object.assign(new Articulo(), elemento);
            arreglo.push(entity);
        })
        return arreglo;
    }
}
