import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedidaArticuloDetailComponent } from './medida-articulo-detail.component';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Detail Component', () => {
    let comp: MedidaArticuloDetailComponent;
    let fixture: ComponentFixture<MedidaArticuloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MedidaArticuloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ medidaArticulo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MedidaArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedidaArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medidaArticulo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medidaArticulo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
