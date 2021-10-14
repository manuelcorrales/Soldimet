import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

import { ListaPrecioDesdeHastaComponent } from './lista-precio-desde-hasta.component';

describe('Component Tests', () => {
  describe('ListaPrecioDesdeHasta Management Component', () => {
    let comp: ListaPrecioDesdeHastaComponent;
    let fixture: ComponentFixture<ListaPrecioDesdeHastaComponent>;
    let service: ListaPrecioDesdeHastaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ListaPrecioDesdeHastaComponent],
      })
        .overrideTemplate(ListaPrecioDesdeHastaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaPrecioDesdeHastaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ListaPrecioDesdeHastaService);

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
      expect(comp.listaPrecioDesdeHastas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
