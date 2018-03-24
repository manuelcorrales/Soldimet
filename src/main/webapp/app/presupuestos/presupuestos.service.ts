import {Injectable} from '@angular/core';
import {SERVER_API_URL} from "../app.constants";
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {JhiDateUtils} from "ng-jhipster";
import {DtoPresupuestoCabeceraComponent} from "../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component";
import {Aplicacion} from "../entities/aplicacion/aplicacion.model";
import {Motor} from "../entities/motor/motor.model";
import {DTODatosMotorComponent} from '../dto/dto-presupuesto-cabecera/DTODatosMotor';
import {DTOParOperacionPresupuestoComponent} from "../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto";
import {Cliente} from "../entities/cliente/cliente.model";
import {MotorService} from "../entities/motor/motor.service";
import {AplicacionService} from "../entities/aplicacion/aplicacion.service";
import {TipoParteMotorService} from "../entities/tipo-parte-motor/tipo-parte-motor.service";
import {CilindradaService} from "../entities/cilindrada/cilindrada.service";
import {Cilindrada} from "../entities/cilindrada/cilindrada.model";
import {TipoParteMotor} from "../entities/tipo-parte-motor/tipo-parte-motor.model";
import {ResponseWrapper} from "../shared/model/response-wrapper.model";
import {HttpClient} from "@angular/common/http";
import { Articulo } from '../entities/articulo';

@Injectable()
export class PresupuestosService {

    private resourceUrlPresupuestos = SERVER_API_URL + 'api/presupuestos';
    private urlPresupuestoCabecera = '/getPresupuestos';
    private urlPresupuestoAplicaciones = '/getAplicacionByMotor/';
    private urlPresupuestoOperacionesCosto = '/getOperacionesPresupuesto';
    private urlPresupuestoClientesFiltro = '/presupuestos/getClientesByNombre/';
    private urlPresupuestoRepuestos = '/getRepuestos';

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
        console.log(`id motor:${motor.id} gato`);
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoAplicaciones}${motor.id}`;

        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAAplicacion(jsonResponse);
        });

    }

    findOperacionesPresupuesto(datos: DTODatosMotorComponent): Observable<DTOParOperacionPresupuestoComponent[]> {
        let body = JSON.stringify(datos);
        const urlLlamada = `${this.resourceUrlPresupuestos}${this.urlPresupuestoOperacionesCosto}?idMotor=${datos.idMotor}&idCilindrada=${datos.idCilindrada}&idAplicacion=${datos.idAplicacion}&idTiposPartesMotores=${datos.idTiposPartesMotores}`;
        console.log("LLAMADO: "+urlLlamada)
        return this.http.get(urlLlamada).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAPArejaCostoOperacion(jsonResponse);
        });
    }

    findClientesByNombre(nombre: string): Observable<Cliente[]> {
        return this.http.get(`${this.resourceUrlPresupuestos}` + this.urlPresupuestoClientesFiltro + '{' + nombre + '}').map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonACliente(jsonResponse);
        });

    }

    buscarMotores(): Motor[] {
        var arreglo: Motor[] = [];
        this.motorService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonAMotor(res))
        });
        return arreglo;
    }

    buscarCilindradas(): Cilindrada[] {
        var arreglo: Cilindrada[] = [];
        this.cilindradaService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonACilindrada(res))
        });
        return arreglo;
    }

    buscarTiposPartes(): TipoParteMotor[] {
        var arreglo: TipoParteMotor[] = [];
        this.tipoParteService.query().subscribe((res: ResponseWrapper) => {
            arreglo.push(...this.convertJsonATipoParteMotor(res))
        });
        return arreglo;
    }

    buscarRepuestos(): Observable<Articulo[]> {
        const url = `${this.resourceUrlPresupuestos}` + this.urlPresupuestoRepuestos;
        console.log( url)
        return this.http.get(url).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertJsonAArticulo(jsonResponse);
        });
    }


    /**
     * Convert a returned JSON object to PresupuestoDTO.
     */
    convertJsonAPresupuestoCabecera(json: any): DtoPresupuestoCabeceraComponent[] {
        var arreglo: DtoPresupuestoCabeceraComponent[] = [];
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

        console.log('respuesta');
        console.log(json);
        console.log('respuesta en cadena');
        console.log(JSON.stringify(json));

        var arreglo: Aplicacion[] = [];
        json.forEach((elemento) => {
            const entity: Aplicacion =
                Object.assign(new Aplicacion(), elemento);
            arreglo.push(entity);
        })

        return arreglo;

        /*let body = json.json();
        return body;
        */

        //return <Aplicacion[]>JSON.parse(json.json) as Aplicacion[] || [];
    }

    convertJsonAPArejaCostoOperacion(json: any): DTOParOperacionPresupuestoComponent[] {
        var arreglo: DTOParOperacionPresupuestoComponent[] = [];
        json.forEach((elemento) => {
            const entity: DTOParOperacionPresupuestoComponent =
                Object.assign(new DTOParOperacionPresupuestoComponent(), json);
            arreglo.push(entity);
        })

        return arreglo || [];
    }

    convertJsonACliente(json: any): Cliente[] {
        var arreglo: Cliente[] = [];
        json.forEach((elemento) => {
            const entity: Cliente =
                Object.assign(new Cliente(), json);
            arreglo.push(entity);
        })
        return arreglo || [];

    }

    convertJsonAMotor(res: ResponseWrapper): Motor[] {
        var arreglo: Motor[] = [];
        res.json.forEach((elemento) => {
            const entity: Motor =
                Object.assign(new Motor(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];

    }

    convertJsonATipoParteMotor(res: ResponseWrapper): TipoParteMotor[] {
        var arreglo: TipoParteMotor[] = [];
        res.json.forEach((elemento) => {
            const entity: TipoParteMotor =
                Object.assign(new TipoParteMotor(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonACilindrada(res: ResponseWrapper): Cilindrada[] {
        var arreglo: Cilindrada[] = [];
        res.json.forEach((elemento) => {
            const entity: Cilindrada =
                Object.assign(new Cilindrada(), elemento);
            arreglo.push(entity);
        })
        return arreglo || [];
    }

    convertJsonAArticulo(json: any): Articulo[] {
        var arreglo: Articulo[] = [];
        json.forEach((elemento) => {
            const entity: Articulo =
                Object.assign(new Articulo(), json);
            arreglo.push(entity);
        })

        return arreglo || [];
    }
}
