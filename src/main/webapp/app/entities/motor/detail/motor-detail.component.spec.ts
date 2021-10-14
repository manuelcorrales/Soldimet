import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MotorDetailComponent } from './motor-detail.component';

describe('Component Tests', () => {
  describe('Motor Management Detail Component', () => {
    let comp: MotorDetailComponent;
    let fixture: ComponentFixture<MotorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MotorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ motor: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MotorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MotorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load motor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.motor).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
