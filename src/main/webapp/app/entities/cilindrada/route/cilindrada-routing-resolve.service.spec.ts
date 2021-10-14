jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICilindrada, Cilindrada } from '../cilindrada.model';
import { CilindradaService } from '../service/cilindrada.service';

import { CilindradaRoutingResolveService } from './cilindrada-routing-resolve.service';

describe('Service Tests', () => {
  describe('Cilindrada routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CilindradaRoutingResolveService;
    let service: CilindradaService;
    let resultCilindrada: ICilindrada | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CilindradaRoutingResolveService);
      service = TestBed.inject(CilindradaService);
      resultCilindrada = undefined;
    });

    describe('resolve', () => {
      it('should return ICilindrada returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCilindrada = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCilindrada).toEqual({ id: 123 });
      });

      it('should return new ICilindrada if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCilindrada = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCilindrada).toEqual(new Cilindrada());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Cilindrada })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCilindrada = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCilindrada).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
