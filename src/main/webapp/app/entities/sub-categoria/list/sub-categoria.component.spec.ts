import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SubCategoriaService } from '../service/sub-categoria.service';

import { SubCategoriaComponent } from './sub-categoria.component';

describe('Component Tests', () => {
  describe('SubCategoria Management Component', () => {
    let comp: SubCategoriaComponent;
    let fixture: ComponentFixture<SubCategoriaComponent>;
    let service: SubCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SubCategoriaComponent],
      })
        .overrideTemplate(SubCategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoriaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SubCategoriaService);

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
      expect(comp.subCategorias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
