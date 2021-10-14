import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoCobranzaOperacionDetailComponent } from './estado-cobranza-operacion-detail.component';

describe('Component Tests', () => {
  describe('EstadoCobranzaOperacion Management Detail Component', () => {
    let comp: EstadoCobranzaOperacionDetailComponent;
    let fixture: ComponentFixture<EstadoCobranzaOperacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoCobranzaOperacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoCobranzaOperacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoCobranzaOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoCobranzaOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoCobranzaOperacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoCobranzaOperacion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
