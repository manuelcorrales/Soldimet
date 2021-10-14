jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRubro, Rubro } from '../rubro.model';
import { RubroService } from '../service/rubro.service';

import { RubroRoutingResolveService } from './rubro-routing-resolve.service';

describe('Service Tests', () => {
  describe('Rubro routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: RubroRoutingResolveService;
    let service: RubroService;
    let resultRubro: IRubro | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(RubroRoutingResolveService);
      service = TestBed.inject(RubroService);
      resultRubro = undefined;
    });

    describe('resolve', () => {
      it('should return IRubro returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRubro = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRubro).toEqual({ id: 123 });
      });

      it('should return new IRubro if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRubro = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultRubro).toEqual(new Rubro());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Rubro })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRubro = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRubro).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
