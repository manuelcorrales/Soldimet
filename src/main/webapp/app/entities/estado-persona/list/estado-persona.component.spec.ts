import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoPersonaService } from '../service/estado-persona.service';

import { EstadoPersonaComponent } from './estado-persona.component';

describe('Component Tests', () => {
  describe('EstadoPersona Management Component', () => {
    let comp: EstadoPersonaComponent;
    let fixture: ComponentFixture<EstadoPersonaComponent>;
    let service: EstadoPersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoPersonaComponent],
      })
        .overrideTemplate(EstadoPersonaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPersonaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoPersonaService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoPersonas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
