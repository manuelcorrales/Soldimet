import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoCostoRepuestoDetailComponent } from './estado-costo-repuesto-detail.component';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Detail Component', () => {
    let comp: EstadoCostoRepuestoDetailComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoCostoRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoCostoRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoCostoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoCostoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoCostoRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoCostoRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
