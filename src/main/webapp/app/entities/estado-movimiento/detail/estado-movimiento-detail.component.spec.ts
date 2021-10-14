import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoMovimientoDetailComponent } from './estado-movimiento-detail.component';

describe('Component Tests', () => {
  describe('EstadoMovimiento Management Detail Component', () => {
    let comp: EstadoMovimientoDetailComponent;
    let fixture: ComponentFixture<EstadoMovimientoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoMovimientoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoMovimiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoMovimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoMovimiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
