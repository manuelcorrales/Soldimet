import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { SubCategoriaComponent } from 'app/entities/sub-categoria/sub-categoria.component';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';

describe('Component Tests', () => {
  describe('SubCategoria Management Component', () => {
    let comp: SubCategoriaComponent;
    let fixture: ComponentFixture<SubCategoriaComponent>;
    let service: SubCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [SubCategoriaComponent],
        providers: []
      })
        .overrideTemplate(SubCategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubCategoriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubCategoria(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subCategorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
