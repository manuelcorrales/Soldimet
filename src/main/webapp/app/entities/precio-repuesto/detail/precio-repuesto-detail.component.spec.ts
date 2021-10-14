import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrecioRepuestoDetailComponent } from './precio-repuesto-detail.component';

describe('Component Tests', () => {
  describe('PrecioRepuesto Management Detail Component', () => {
    let comp: PrecioRepuestoDetailComponent;
    let fixture: ComponentFixture<PrecioRepuestoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PrecioRepuestoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ precioRepuesto: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PrecioRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrecioRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load precioRepuesto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.precioRepuesto).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
