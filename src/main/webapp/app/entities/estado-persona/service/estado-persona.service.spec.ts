import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstadoPersona, EstadoPersona } from '../estado-persona.model';

import { EstadoPersonaService } from './estado-persona.service';

describe('Service Tests', () => {
  describe('EstadoPersona Service', () => {
    let service: EstadoPersonaService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstadoPersona;
    let expectedResult: IEstadoPersona | IEstadoPersona[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EstadoPersonaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreEstado: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EstadoPersona', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstadoPersona()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstadoPersona', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreEstado: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a EstadoPersona', () => {
        const patchObject = Object.assign(
          {
            nombreEstado: 'BBBBBB',
          },
          new EstadoPersona()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstadoPersona', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreEstado: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EstadoPersona', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEstadoPersonaToCollectionIfMissing', () => {
        it('should add a EstadoPersona to an empty array', () => {
          const estadoPersona: IEstadoPersona = { id: 123 };
          expectedResult = service.addEstadoPersonaToCollectionIfMissing([], estadoPersona);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPersona);
        });

        it('should not add a EstadoPersona to an array that contains it', () => {
          const estadoPersona: IEstadoPersona = { id: 123 };
          const estadoPersonaCollection: IEstadoPersona[] = [
            {
              ...estadoPersona,
            },
            { id: 456 },
          ];
          expectedResult = service.addEstadoPersonaToCollectionIfMissing(estadoPersonaCollection, estadoPersona);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EstadoPersona to an array that doesn't contain it", () => {
          const estadoPersona: IEstadoPersona = { id: 123 };
          const estadoPersonaCollection: IEstadoPersona[] = [{ id: 456 }];
          expectedResult = service.addEstadoPersonaToCollectionIfMissing(estadoPersonaCollection, estadoPersona);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPersona);
        });

        it('should add only unique EstadoPersona to an array', () => {
          const estadoPersonaArray: IEstadoPersona[] = [{ id: 123 }, { id: 456 }, { id: 17168 }];
          const estadoPersonaCollection: IEstadoPersona[] = [{ id: 123 }];
          expectedResult = service.addEstadoPersonaToCollectionIfMissing(estadoPersonaCollection, ...estadoPersonaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const estadoPersona: IEstadoPersona = { id: 123 };
          const estadoPersona2: IEstadoPersona = { id: 456 };
          expectedResult = service.addEstadoPersonaToCollectionIfMissing([], estadoPersona, estadoPersona2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(estadoPersona);
          expect(expectedResult).toContain(estadoPersona2);
        });

        it('should accept null and undefined values', () => {
          const estadoPersona: IEstadoPersona = { id: 123 };
          expectedResult = service.addEstadoPersonaToCollectionIfMissing([], null, estadoPersona, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(estadoPersona);
        });

        it('should return initial array if no EstadoPersona is added', () => {
          const estadoPersonaCollection: IEstadoPersona[] = [{ id: 123 }];
          expectedResult = service.addEstadoPersonaToCollectionIfMissing(estadoPersonaCollection, undefined, null);
          expect(expectedResult).toEqual(estadoPersonaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
