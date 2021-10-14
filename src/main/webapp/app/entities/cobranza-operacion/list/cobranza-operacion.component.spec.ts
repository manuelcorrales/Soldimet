import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CobranzaOperacionService } from '../service/cobranza-operacion.service';

import { CobranzaOperacionComponent } from './cobranza-operacion.component';

describe('Component Tests', () => {
  describe('CobranzaOperacion Management Component', () => {
    let comp: CobranzaOperacionComponent;
    let fixture: ComponentFixture<CobranzaOperacionComponent>;
    let service: CobranzaOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CobranzaOperacionComponent],
      })
        .overrideTemplate(CobranzaOperacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaOperacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CobranzaOperacionService);

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
      expect(comp.cobranzaOperacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
