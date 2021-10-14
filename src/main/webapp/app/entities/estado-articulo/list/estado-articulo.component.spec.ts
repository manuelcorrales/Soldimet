import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoArticuloService } from '../service/estado-articulo.service';

import { EstadoArticuloComponent } from './estado-articulo.component';

describe('Component Tests', () => {
  describe('EstadoArticulo Management Component', () => {
    let comp: EstadoArticuloComponent;
    let fixture: ComponentFixture<EstadoArticuloComponent>;
    let service: EstadoArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoArticuloComponent],
      })
        .overrideTemplate(EstadoArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoArticuloComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoArticuloService);

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
      expect(comp.estadoArticulos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
