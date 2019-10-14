import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';
import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

describe('Service Tests', () => {
  describe('ListaPrecioDesdeHasta Service', () => {
    let injector: TestBed;
    let service: ListaPrecioDesdeHastaService;
    let httpMock: HttpTestingController;
    let elemDefault: IListaPrecioDesdeHasta;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ListaPrecioDesdeHastaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ListaPrecioDesdeHasta(0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT)
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

      it('should create a ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate
          },
          returnedFromService
        );
        service
          .create(new ListaPrecioDesdeHasta(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate
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

      it('should return a list of ListaPrecioDesdeHasta', () => {
        const returnedFromService = Object.assign(
          {
            fechaDesde: currentDate.format(DATE_FORMAT),
            fechaHasta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaDesde: currentDate,
            fechaHasta: currentDate
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

      it('should delete a ListaPrecioDesdeHasta', () => {
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
