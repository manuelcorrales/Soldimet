jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';

import { TipoDetalleMovimientoRoutingResolveService } from './tipo-detalle-movimiento-routing-resolve.service';

describe('Service Tests', () => {
  describe('TipoDetalleMovimiento routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TipoDetalleMovimientoRoutingResolveService;
    let service: TipoDetalleMovimientoService;
    let resultTipoDetalleMovimiento: ITipoDetalleMovimiento | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TipoDetalleMovimientoRoutingResolveService);
      service = TestBed.inject(TipoDetalleMovimientoService);
      resultTipoDetalleMovimiento = undefined;
    });

    describe('resolve', () => {
      it('should return ITipoDetalleMovimiento returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoDetalleMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoDetalleMovimiento).toEqual({ id: 123 });
      });

      it('should return new ITipoDetalleMovimiento if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoDetalleMovimiento = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTipoDetalleMovimiento).toEqual(new TipoDetalleMovimiento());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TipoDetalleMovimiento })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoDetalleMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoDetalleMovimiento).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
