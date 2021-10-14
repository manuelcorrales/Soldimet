import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PresupuestoDetailComponent } from './presupuesto-detail.component';

describe('Component Tests', () => {
  describe('Presupuesto Management Detail Component', () => {
    let comp: PresupuestoDetailComponent;
    let fixture: ComponentFixture<PresupuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PresupuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ presupuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load presupuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.presupuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
