import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HistorialPrecioService } from '../service/historial-precio.service';

import { HistorialPrecioComponent } from './historial-precio.component';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Component', () => {
    let comp: HistorialPrecioComponent;
    let fixture: ComponentFixture<HistorialPrecioComponent>;
    let service: HistorialPrecioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HistorialPrecioComponent],
      })
        .overrideTemplate(HistorialPrecioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorialPrecioComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(HistorialPrecioService);

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
      expect(comp.historialPrecios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
