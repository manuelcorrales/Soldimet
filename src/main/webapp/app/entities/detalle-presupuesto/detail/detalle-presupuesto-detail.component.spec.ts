import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetallePresupuestoDetailComponent } from './detalle-presupuesto-detail.component';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Detail Component', () => {
    let comp: DetallePresupuestoDetailComponent;
    let fixture: ComponentFixture<DetallePresupuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DetallePresupuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ detallePresupuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DetallePresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detallePresupuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallePresupuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
