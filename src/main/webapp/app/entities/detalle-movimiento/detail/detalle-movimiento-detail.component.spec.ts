import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetalleMovimientoDetailComponent } from './detalle-movimiento-detail.component';

describe('Component Tests', () => {
  describe('DetalleMovimiento Management Detail Component', () => {
    let comp: DetalleMovimientoDetailComponent;
    let fixture: ComponentFixture<DetalleMovimientoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DetalleMovimientoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ detalleMovimiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DetalleMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detalleMovimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleMovimiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
