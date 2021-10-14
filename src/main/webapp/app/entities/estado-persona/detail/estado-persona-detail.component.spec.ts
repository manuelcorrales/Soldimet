import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EstadoPersonaDetailComponent } from './estado-persona-detail.component';

describe('Component Tests', () => {
  describe('EstadoPersona Management Detail Component', () => {
    let comp: EstadoPersonaDetailComponent;
    let fixture: ComponentFixture<EstadoPersonaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EstadoPersonaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ estadoPersona: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EstadoPersonaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPersonaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoPersona on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPersona).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
