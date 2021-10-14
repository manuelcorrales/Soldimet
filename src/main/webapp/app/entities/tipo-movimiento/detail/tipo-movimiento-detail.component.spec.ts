import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoMovimientoDetailComponent } from './tipo-movimiento-detail.component';

describe('Component Tests', () => {
  describe('TipoMovimiento Management Detail Component', () => {
    let comp: TipoMovimientoDetailComponent;
    let fixture: ComponentFixture<TipoMovimientoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TipoMovimientoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tipoMovimiento: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TipoMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoMovimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoMovimiento).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
