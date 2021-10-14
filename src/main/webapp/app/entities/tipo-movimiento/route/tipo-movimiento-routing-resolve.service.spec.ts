jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITipoMovimiento, TipoMovimiento } from '../tipo-movimiento.model';
import { TipoMovimientoService } from '../service/tipo-movimiento.service';

import { TipoMovimientoRoutingResolveService } from './tipo-movimiento-routing-resolve.service';

describe('Service Tests', () => {
  describe('TipoMovimiento routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TipoMovimientoRoutingResolveService;
    let service: TipoMovimientoService;
    let resultTipoMovimiento: ITipoMovimiento | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TipoMovimientoRoutingResolveService);
      service = TestBed.inject(TipoMovimientoService);
      resultTipoMovimiento = undefined;
    });

    describe('resolve', () => {
      it('should return ITipoMovimiento returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoMovimiento).toEqual({ id: 123 });
      });

      it('should return new ITipoMovimiento if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoMovimiento = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTipoMovimiento).toEqual(new TipoMovimiento());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TipoMovimiento })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoMovimiento).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
