jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDetallePresupuesto, DetallePresupuesto } from '../detalle-presupuesto.model';
import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';

import { DetallePresupuestoRoutingResolveService } from './detalle-presupuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('DetallePresupuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DetallePresupuestoRoutingResolveService;
    let service: DetallePresupuestoService;
    let resultDetallePresupuesto: IDetallePresupuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DetallePresupuestoRoutingResolveService);
      service = TestBed.inject(DetallePresupuestoService);
      resultDetallePresupuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IDetallePresupuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDetallePresupuesto).toEqual({ id: 123 });
      });

      it('should return new IDetallePresupuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePresupuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDetallePresupuesto).toEqual(new DetallePresupuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DetallePresupuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDetallePresupuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
