import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CajaService } from 'app/entities/caja/caja.service';
import { ICaja, Caja } from 'app/shared/model/caja.model';

describe('Service Tests', () => {
  describe('Caja Service', () => {
    let injector: TestBed;
    let service: CajaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICaja;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CajaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Caja(0, currentDate, currentDate, currentDate, 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_FORMAT),
            horaApertura: currentDate.format(DATE_TIME_FORMAT),
            horaCierre: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Caja', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_FORMAT),
            horaApertura: currentDate.format(DATE_TIME_FORMAT),
            horaCierre: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            horaApertura: currentDate,
            horaCierre: currentDate
          },
          returnedFromService
        );
        service
          .create(new Caja(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Caja', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_FORMAT),
            horaApertura: currentDate.format(DATE_TIME_FORMAT),
            horaCierre: currentDate.format(DATE_TIME_FORMAT),
            saldo: 1,
            observaciones: 'BBBBBB',
            saldoFisico: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
            horaApertura: currentDate,
            horaCierre: currentDate
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

      it('should return a list of Caja', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_FORMAT),
            horaApertura: currentDate.format(DATE_TIME_FORMAT),
            horaCierre: currentDate.format(DATE_TIME_FORMAT),
            saldo: 1,
            observaciones: 'BBBBBB',
            saldoFisico: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            horaApertura: currentDate,
            horaCierre: currentDate
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

      it('should delete a Caja', () => {
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
