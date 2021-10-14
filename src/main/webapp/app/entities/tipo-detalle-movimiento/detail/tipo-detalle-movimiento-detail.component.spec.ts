import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoDetalleMovimientoDetailComponent } from './tipo-detalle-movimiento-detail.component';

describe('Component Tests', () => {
  describe('TipoDetalleMovimiento Management Detail Component', () => {
    let comp: TipoDetalleMovimientoDetailComponent;
    let fixture: ComponentFixture<TipoDetalleMovimientoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TipoDetalleMovimientoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tipoDetalleMovimiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TipoDetalleMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoDetalleMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoDetalleMovimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoDetalleMovimiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
