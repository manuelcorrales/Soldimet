import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { IMedioDePagoCheque, MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

describe('Service Tests', () => {
  describe('MedioDePagoCheque Service', () => {
    let injector: TestBed;
    let service: MedioDePagoChequeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedioDePagoCheque;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MedioDePagoChequeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MedioDePagoCheque(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaRecibo: currentDate.format(DATE_FORMAT),
            fechaCobro: currentDate.format(DATE_FORMAT)
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

      it('should create a MedioDePagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaRecibo: currentDate.format(DATE_FORMAT),
            fechaCobro: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaRecibo: currentDate,
            fechaCobro: currentDate
          },
          returnedFromService
        );
        service
          .create(new MedioDePagoCheque(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a MedioDePagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            numeroCheque: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaRecibo: currentDate,
            fechaCobro: currentDate
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

      it('should return a list of MedioDePagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            numeroCheque: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaRecibo: currentDate,
            fechaCobro: currentDate
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

      it('should delete a MedioDePagoCheque', () => {
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
