import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoOperacionDetailComponent } from './estado-operacion-detail.component';

describe('Component Tests', () => {
  describe('EstadoOperacion Management Detail Component', () => {
    let comp: EstadoOperacionDetailComponent;
    let fixture: ComponentFixture<EstadoOperacionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoOperacionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoOperacion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoOperacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoOperacion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
