jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPresupuesto, Presupuesto } from '../presupuesto.model';
import { PresupuestoService } from '../service/presupuesto.service';

import { PresupuestoRoutingResolveService } from './presupuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('Presupuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PresupuestoRoutingResolveService;
    let service: PresupuestoService;
    let resultPresupuesto: IPresupuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PresupuestoRoutingResolveService);
      service = TestBed.inject(PresupuestoService);
      resultPresupuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IPresupuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPresupuesto).toEqual({ id: 123 });
      });

      it('should return new IPresupuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPresupuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPresupuesto).toEqual(new Presupuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Presupuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPresupuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPresupuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
