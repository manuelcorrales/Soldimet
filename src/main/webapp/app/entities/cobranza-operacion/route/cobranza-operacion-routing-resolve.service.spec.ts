jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICobranzaOperacion, CobranzaOperacion } from '../cobranza-operacion.model';
import { CobranzaOperacionService } from '../service/cobranza-operacion.service';

import { CobranzaOperacionRoutingResolveService } from './cobranza-operacion-routing-resolve.service';

describe('Service Tests', () => {
  describe('CobranzaOperacion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CobranzaOperacionRoutingResolveService;
    let service: CobranzaOperacionService;
    let resultCobranzaOperacion: ICobranzaOperacion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CobranzaOperacionRoutingResolveService);
      service = TestBed.inject(CobranzaOperacionService);
      resultCobranzaOperacion = undefined;
    });

    describe('resolve', () => {
      it('should return ICobranzaOperacion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCobranzaOperacion).toEqual({ id: 123 });
      });

      it('should return new ICobranzaOperacion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCobranzaOperacion).toEqual(new CobranzaOperacion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CobranzaOperacion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCobranzaOperacion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
