jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';

import { EstadoCobranzaOperacionRoutingResolveService } from './estado-cobranza-operacion-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoCobranzaOperacion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoCobranzaOperacionRoutingResolveService;
    let service: EstadoCobranzaOperacionService;
    let resultEstadoCobranzaOperacion: IEstadoCobranzaOperacion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoCobranzaOperacionRoutingResolveService);
      service = TestBed.inject(EstadoCobranzaOperacionService);
      resultEstadoCobranzaOperacion = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoCobranzaOperacion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoCobranzaOperacion).toEqual({ id: 123 });
      });

      it('should return new IEstadoCobranzaOperacion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoCobranzaOperacion).toEqual(new EstadoCobranzaOperacion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoCobranzaOperacion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoCobranzaOperacion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
