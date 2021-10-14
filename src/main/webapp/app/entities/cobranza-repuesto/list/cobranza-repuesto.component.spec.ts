import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';

import { CobranzaRepuestoComponent } from './cobranza-repuesto.component';

describe('Component Tests', () => {
  describe('CobranzaRepuesto Management Component', () => {
    let comp: CobranzaRepuestoComponent;
    let fixture: ComponentFixture<CobranzaRepuestoComponent>;
    let service: CobranzaRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CobranzaRepuestoComponent],
      })
        .overrideTemplate(CobranzaRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CobranzaRepuestoService);

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
      expect(comp.cobranzaRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
