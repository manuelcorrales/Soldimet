import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MotorDetailComponent } from 'app/entities/motor/motor-detail.component';
import { Motor } from 'app/shared/model/motor.model';

describe('Component Tests', () => {
  describe('Motor Management Detail Component', () => {
    let comp: MotorDetailComponent;
    let fixture: ComponentFixture<MotorDetailComponent>;
    const route = ({ data: of({ motor: new Motor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MotorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MotorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MotorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.motor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
