import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedidaArticuloService } from '../service/medida-articulo.service';

import { MedidaArticuloComponent } from './medida-articulo.component';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Component', () => {
    let comp: MedidaArticuloComponent;
    let fixture: ComponentFixture<MedidaArticuloComponent>;
    let service: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedidaArticuloComponent],
      })
        .overrideTemplate(MedidaArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedidaArticuloComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MedidaArticuloService);

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
      expect(comp.medidaArticulos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
