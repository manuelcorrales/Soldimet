import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoPresupuestoDetailComponent } from './estado-presupuesto-detail.component';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Detail Component', () => {
    let comp: EstadoPresupuestoDetailComponent;
    let fixture: ComponentFixture<EstadoPresupuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoPresupuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoPresupuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoPresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoPresupuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPresupuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
