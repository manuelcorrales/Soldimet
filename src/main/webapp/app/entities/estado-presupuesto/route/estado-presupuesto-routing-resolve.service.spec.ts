jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoPresupuesto, EstadoPresupuesto } from '../estado-presupuesto.model';
import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';

import { EstadoPresupuestoRoutingResolveService } from './estado-presupuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoPresupuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoPresupuestoRoutingResolveService;
    let service: EstadoPresupuestoService;
    let resultEstadoPresupuesto: IEstadoPresupuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoPresupuestoRoutingResolveService);
      service = TestBed.inject(EstadoPresupuestoService);
      resultEstadoPresupuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoPresupuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoPresupuesto).toEqual({ id: 123 });
      });

      it('should return new IEstadoPresupuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPresupuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoPresupuesto).toEqual(new EstadoPresupuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoPresupuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoPresupuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
