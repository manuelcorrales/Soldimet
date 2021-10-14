import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ListaPrecioDesdeHastaDetailComponent } from './lista-precio-desde-hasta-detail.component';

describe('Component Tests', () => {
  describe('ListaPrecioDesdeHasta Management Detail Component', () => {
    let comp: ListaPrecioDesdeHastaDetailComponent;
    let fixture: ComponentFixture<ListaPrecioDesdeHastaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ListaPrecioDesdeHastaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ listaPrecioDesdeHasta: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ListaPrecioDesdeHastaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaPrecioDesdeHastaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load listaPrecioDesdeHasta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.listaPrecioDesdeHasta).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
