import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MotorService } from '../service/motor.service';

import { MotorComponent } from './motor.component';

describe('Component Tests', () => {
  describe('Motor Management Component', () => {
    let comp: MotorComponent;
    let fixture: ComponentFixture<MotorComponent>;
    let service: MotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MotorComponent],
      })
        .overrideTemplate(MotorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MotorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MotorService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.motors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
