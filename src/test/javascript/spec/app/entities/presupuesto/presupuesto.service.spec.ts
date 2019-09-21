import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { IPresupuesto, Presupuesto } from 'app/shared/model/presupuesto.model';

describe('Service Tests', () => {
  describe('Presupuesto Service', () => {
    let injector: TestBed;
    let service: PresupuestoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPresupuesto;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PresupuestoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Presupuesto(0, 'AAAAAAA', 0, currentDate, currentDate, currentDate, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate
          },
          returnedFromService
        );
        service
          .create(new Presupuesto(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            descripcionDescuento: 'BBBBBB',
            descuento: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
            importeTotal: 1,
            observaciones: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Presupuesto', () => {
        const returnedFromService = Object.assign(
          {
            descripcionDescuento: 'BBBBBB',
            descuento: 1,
            fechaCreacion: currentDate.format(DATE_FORMAT),
            fechaAceptado: currentDate.format(DATE_FORMAT),
            fechaEntregado: currentDate.format(DATE_FORMAT),
            importeTotal: 1,
            observaciones: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCreacion: currentDate,
            fechaAceptado: currentDate,
            fechaEntregado: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Presupuesto', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
