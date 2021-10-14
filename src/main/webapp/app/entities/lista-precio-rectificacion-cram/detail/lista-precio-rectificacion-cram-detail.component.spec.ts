import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ListaPrecioRectificacionCRAMDetailComponent } from './lista-precio-rectificacion-cram-detail.component';

describe('Component Tests', () => {
  describe('ListaPrecioRectificacionCRAM Management Detail Component', () => {
    let comp: ListaPrecioRectificacionCRAMDetailComponent;
    let fixture: ComponentFixture<ListaPrecioRectificacionCRAMDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ListaPrecioRectificacionCRAMDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ listaPrecioRectificacionCRAM: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ListaPrecioRectificacionCRAMDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load listaPrecioRectificacionCRAM on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.listaPrecioRectificacionCRAM).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
