import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';

import { ListaPrecioRectificacionCRAMComponent } from './lista-precio-rectificacion-cram.component';

describe('Component Tests', () => {
  describe('ListaPrecioRectificacionCRAM Management Component', () => {
    let comp: ListaPrecioRectificacionCRAMComponent;
    let fixture: ComponentFixture<ListaPrecioRectificacionCRAMComponent>;
    let service: ListaPrecioRectificacionCRAMService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ListaPrecioRectificacionCRAMComponent],
      })
        .overrideTemplate(ListaPrecioRectificacionCRAMComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ListaPrecioRectificacionCRAMService);

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
      expect(comp.listaPrecioRectificacionCRAMS?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
