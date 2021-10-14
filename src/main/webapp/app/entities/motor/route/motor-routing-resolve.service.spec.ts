jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMotor, Motor } from '../motor.model';
import { MotorService } from '../service/motor.service';

import { MotorRoutingResolveService } from './motor-routing-resolve.service';

describe('Service Tests', () => {
  describe('Motor routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MotorRoutingResolveService;
    let service: MotorService;
    let resultMotor: IMotor | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MotorRoutingResolveService);
      service = TestBed.inject(MotorService);
      resultMotor = undefined;
    });

    describe('resolve', () => {
      it('should return IMotor returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMotor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMotor).toEqual({ id: 123 });
      });

      it('should return new IMotor if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMotor = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMotor).toEqual(new Motor());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Motor })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMotor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMotor).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
