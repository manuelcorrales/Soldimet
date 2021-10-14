import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovimientoPresupuestoDetailComponent } from './movimiento-presupuesto-detail.component';

describe('Component Tests', () => {
  describe('MovimientoPresupuesto Management Detail Component', () => {
    let comp: MovimientoPresupuestoDetailComponent;
    let fixture: ComponentFixture<MovimientoPresupuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MovimientoPresupuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ movimientoPresupuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MovimientoPresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoPresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimientoPresupuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimientoPresupuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
