import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HistorialPrecioDetailComponent } from './historial-precio-detail.component';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Detail Component', () => {
    let comp: HistorialPrecioDetailComponent;
    let fixture: ComponentFixture<HistorialPrecioDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HistorialPrecioDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ historialPrecio: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(HistorialPrecioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialPrecioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historialPrecio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historialPrecio).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
