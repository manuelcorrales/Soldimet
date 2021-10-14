jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from '../estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

import { EstadoCostoRepuestoRoutingResolveService } from './estado-costo-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoCostoRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoCostoRepuestoRoutingResolveService;
    let service: EstadoCostoRepuestoService;
    let resultEstadoCostoRepuesto: IEstadoCostoRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoCostoRepuestoRoutingResolveService);
      service = TestBed.inject(EstadoCostoRepuestoService);
      resultEstadoCostoRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoCostoRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCostoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoCostoRepuesto).toEqual({ id: 123 });
      });

      it('should return new IEstadoCostoRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCostoRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoCostoRepuesto).toEqual(new EstadoCostoRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoCostoRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoCostoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoCostoRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
