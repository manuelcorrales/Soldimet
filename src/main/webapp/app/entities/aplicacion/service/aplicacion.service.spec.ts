import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAplicacion, Aplicacion } from '../aplicacion.model';

import { AplicacionService } from './aplicacion.service';

describe('Service Tests', () => {
  describe('Aplicacion Service', () => {
    let service: AplicacionService;
    let httpMock: HttpTestingController;
    let elemDefault: IAplicacion;
    let expectedResult: IAplicacion | IAplicacion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AplicacionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nombreAplicacion: 'AAAAAAA',
        numeroGrupo: 0,
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

      it('should create a Aplicacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Aplicacion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Aplicacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreAplicacion: 'BBBBBB',
            numeroGrupo: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Aplicacion', () => {
        const patchObject = Object.assign(
          {
            nombreAplicacion: 'BBBBBB',
            numeroGrupo: 1,
          },
          new Aplicacion()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Aplicacion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nombreAplicacion: 'BBBBBB',
            numeroGrupo: 1,
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

      it('should delete a Aplicacion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAplicacionToCollectionIfMissing', () => {
        it('should add a Aplicacion to an empty array', () => {
          const aplicacion: IAplicacion = { id: 123 };
          expectedResult = service.addAplicacionToCollectionIfMissing([], aplicacion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(aplicacion);
        });

        it('should not add a Aplicacion to an array that contains it', () => {
          const aplicacion: IAplicacion = { id: 123 };
          const aplicacionCollection: IAplicacion[] = [
            {
              ...aplicacion,
            },
            { id: 456 },
          ];
          expectedResult = service.addAplicacionToCollectionIfMissing(aplicacionCollection, aplicacion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Aplicacion to an array that doesn't contain it", () => {
          const aplicacion: IAplicacion = { id: 123 };
          const aplicacionCollection: IAplicacion[] = [{ id: 456 }];
          expectedResult = service.addAplicacionToCollectionIfMissing(aplicacionCollection, aplicacion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(aplicacion);
        });

        it('should add only unique Aplicacion to an array', () => {
          const aplicacionArray: IAplicacion[] = [{ id: 123 }, { id: 456 }, { id: 56264 }];
          const aplicacionCollection: IAplicacion[] = [{ id: 123 }];
          expectedResult = service.addAplicacionToCollectionIfMissing(aplicacionCollection, ...aplicacionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const aplicacion: IAplicacion = { id: 123 };
          const aplicacion2: IAplicacion = { id: 456 };
          expectedResult = service.addAplicacionToCollectionIfMissing([], aplicacion, aplicacion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(aplicacion);
          expect(expectedResult).toContain(aplicacion2);
        });

        it('should accept null and undefined values', () => {
          const aplicacion: IAplicacion = { id: 123 };
          expectedResult = service.addAplicacionToCollectionIfMissing([], null, aplicacion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(aplicacion);
        });

        it('should return initial array if no Aplicacion is added', () => {
          const aplicacionCollection: IAplicacion[] = [{ id: 123 }];
          expectedResult = service.addAplicacionToCollectionIfMissing(aplicacionCollection, undefined, null);
          expect(expectedResult).toEqual(aplicacionCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
