import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoArticuloDetailComponent } from './estado-articulo-detail.component';

describe('Component Tests', () => {
  describe('EstadoArticulo Management Detail Component', () => {
    let comp: EstadoArticuloDetailComponent;
    let fixture: ComponentFixture<EstadoArticuloDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoArticuloDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoArticulo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoArticulo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoArticulo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
