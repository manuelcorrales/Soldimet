import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';
import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

describe('Service Tests', () => {
  describe('ListaPrecioRectificacionCRAM Service', () => {
    let injector: TestBed;
    let service: ListaPrecioRectificacionCRAMService;
    let httpMock: HttpTestingController;
    let elemDefault: IListaPrecioRectificacionCRAM;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ListaPrecioRectificacionCRAMService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ListaPrecioRectificacionCRAM(0, currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaVigenciaDesde: currentDate.format(DATE_FORMAT),
            fechaVigenciaHasta: currentDate.format(DATE_FORMAT)
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

      it('should create a ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaVigenciaDesde: currentDate.format(DATE_FORMAT),
            fechaVigenciaHasta: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaVigenciaDesde: currentDate,
            fechaVigenciaHasta: currentDate
          },
          returnedFromService
        );
        service
          .create(new ListaPrecioRectificacionCRAM(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            fechaVigenciaDesde: currentDate.format(DATE_FORMAT),
            fechaVigenciaHasta: currentDate.format(DATE_FORMAT),
            numeroGrupo: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaVigenciaDesde: currentDate,
            fechaVigenciaHasta: currentDate
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

      it('should return a list of ListaPrecioRectificacionCRAM', () => {
        const returnedFromService = Object.assign(
          {
            fechaVigenciaDesde: currentDate.format(DATE_FORMAT),
            fechaVigenciaHasta: currentDate.format(DATE_FORMAT),
            numeroGrupo: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaVigenciaDesde: currentDate,
            fechaVigenciaHasta: currentDate
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

      it('should delete a ListaPrecioRectificacionCRAM', () => {
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
