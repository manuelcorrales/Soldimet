import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovimientoArticuloDetailComponent } from './movimiento-articulo-detail.component';

describe('Component Tests', () => {
  describe('MovimientoArticulo Management Detail Component', () => {
    let comp: MovimientoArticuloDetailComponent;
    let fixture: ComponentFixture<MovimientoArticuloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MovimientoArticuloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ movimientoArticulo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MovimientoArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimientoArticulo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimientoArticulo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
