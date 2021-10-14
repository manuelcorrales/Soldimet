jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISucursal, Sucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal.service';

import { SucursalRoutingResolveService } from './sucursal-routing-resolve.service';

describe('Service Tests', () => {
  describe('Sucursal routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SucursalRoutingResolveService;
    let service: SucursalService;
    let resultSucursal: ISucursal | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SucursalRoutingResolveService);
      service = TestBed.inject(SucursalService);
      resultSucursal = undefined;
    });

    describe('resolve', () => {
      it('should return ISucursal returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSucursal = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSucursal).toEqual({ id: 123 });
      });

      it('should return new ISucursal if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSucursal = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSucursal).toEqual(new Sucursal());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Sucursal })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSucursal = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSucursal).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
