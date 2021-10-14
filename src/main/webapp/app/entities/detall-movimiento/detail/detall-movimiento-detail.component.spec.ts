import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetallMovimientoDetailComponent } from './detall-movimiento-detail.component';

describe('Component Tests', () => {
  describe('DetallMovimiento Management Detail Component', () => {
    let comp: DetallMovimientoDetailComponent;
    let fixture: ComponentFixture<DetallMovimientoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DetallMovimientoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ detallMovimiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DetallMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detallMovimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallMovimiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
