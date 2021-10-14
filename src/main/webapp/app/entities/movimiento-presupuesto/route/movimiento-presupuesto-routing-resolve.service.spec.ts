jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMovimientoPresupuesto, MovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';

import { MovimientoPresupuestoRoutingResolveService } from './movimiento-presupuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('MovimientoPresupuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MovimientoPresupuestoRoutingResolveService;
    let service: MovimientoPresupuestoService;
    let resultMovimientoPresupuesto: IMovimientoPresupuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MovimientoPresupuestoRoutingResolveService);
      service = TestBed.inject(MovimientoPresupuestoService);
      resultMovimientoPresupuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IMovimientoPresupuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimientoPresupuesto).toEqual({ id: 123 });
      });

      it('should return new IMovimientoPresupuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoPresupuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMovimientoPresupuesto).toEqual(new MovimientoPresupuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MovimientoPresupuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimientoPresupuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
