import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PrecioRepuestoService } from '../service/precio-repuesto.service';

import { PrecioRepuestoComponent } from './precio-repuesto.component';

describe('Component Tests', () => {
  describe('PrecioRepuesto Management Component', () => {
    let comp: PrecioRepuestoComponent;
    let fixture: ComponentFixture<PrecioRepuestoComponent>;
    let service: PrecioRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PrecioRepuestoComponent],
      })
        .overrideTemplate(PrecioRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrecioRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PrecioRepuestoService);

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
      expect(comp.precioRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
