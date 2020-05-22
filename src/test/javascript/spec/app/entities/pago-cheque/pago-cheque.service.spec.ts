import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';
import { IPagoCheque, PagoCheque } from 'app/shared/model/pago-cheque.model';

describe('Service Tests', () => {
  describe('PagoCheque Service', () => {
    let injector: TestBed;
    let service: PagoChequeService;
    let httpMock: HttpTestingController;
    let elemDefault: IPagoCheque;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PagoChequeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PagoCheque(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaCobro: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT)
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

      it('should create a PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaCobro: currentDate.format(DATE_FORMAT),
            fechaRecibo: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCobro: currentDate,
            fechaRecibo: currentDate
          },
          returnedFromService
        );
        service
          .create(new PagoCheque(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            numeroCheque: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaCobro: currentDate,
            fechaRecibo: currentDate
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

      it('should return a list of PagoCheque', () => {
        const returnedFromService = Object.assign(
          {
            numeroCheque: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaCobro: currentDate,
            fechaRecibo: currentDate
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

      it('should delete a PagoCheque', () => {
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
