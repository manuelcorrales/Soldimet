import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';

import { EstadoCobranzaOperacionComponent } from './estado-cobranza-operacion.component';

describe('Component Tests', () => {
  describe('EstadoCobranzaOperacion Management Component', () => {
    let comp: EstadoCobranzaOperacionComponent;
    let fixture: ComponentFixture<EstadoCobranzaOperacionComponent>;
    let service: EstadoCobranzaOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoCobranzaOperacionComponent],
      })
        .overrideTemplate(EstadoCobranzaOperacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCobranzaOperacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoCobranzaOperacionService);

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
      expect(comp.estadoCobranzaOperacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
