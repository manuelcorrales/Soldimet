jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IBanco, Banco } from '../banco.model';
import { BancoService } from '../service/banco.service';

import { BancoRoutingResolveService } from './banco-routing-resolve.service';

describe('Service Tests', () => {
  describe('Banco routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: BancoRoutingResolveService;
    let service: BancoService;
    let resultBanco: IBanco | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(BancoRoutingResolveService);
      service = TestBed.inject(BancoService);
      resultBanco = undefined;
    });

    describe('resolve', () => {
      it('should return IBanco returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBanco = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBanco).toEqual({ id: 123 });
      });

      it('should return new IBanco if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBanco = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultBanco).toEqual(new Banco());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Banco })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBanco = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBanco).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
