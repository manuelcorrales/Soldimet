import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { LocalidadComponent } from 'app/entities/localidad/localidad.component';
import { LocalidadService } from 'app/entities/localidad/localidad.service';
import { Localidad } from 'app/shared/model/localidad.model';

describe('Component Tests', () => {
  describe('Localidad Management Component', () => {
    let comp: LocalidadComponent;
    let fixture: ComponentFixture<LocalidadComponent>;
    let service: LocalidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [LocalidadComponent],
        providers: []
      })
        .overrideTemplate(LocalidadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalidadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalidadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Localidad(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localidads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
