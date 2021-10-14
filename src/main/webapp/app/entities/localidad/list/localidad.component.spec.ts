import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LocalidadService } from '../service/localidad.service';

import { LocalidadComponent } from './localidad.component';

describe('Component Tests', () => {
  describe('Localidad Management Component', () => {
    let comp: LocalidadComponent;
    let fixture: ComponentFixture<LocalidadComponent>;
    let service: LocalidadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LocalidadComponent],
      })
        .overrideTemplate(LocalidadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalidadComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(LocalidadService);

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
      expect(comp.localidads?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
