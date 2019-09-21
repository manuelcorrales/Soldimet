import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MotorComponent } from 'app/entities/motor/motor.component';
import { MotorService } from 'app/entities/motor/motor.service';
import { Motor } from 'app/shared/model/motor.model';

describe('Component Tests', () => {
  describe('Motor Management Component', () => {
    let comp: MotorComponent;
    let fixture: ComponentFixture<MotorComponent>;
    let service: MotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MotorComponent],
        providers: []
      })
        .overrideTemplate(MotorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MotorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MotorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Motor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.motors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
