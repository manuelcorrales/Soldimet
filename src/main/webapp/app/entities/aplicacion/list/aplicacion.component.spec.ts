import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AplicacionService } from '../service/aplicacion.service';

import { AplicacionComponent } from './aplicacion.component';

describe('Component Tests', () => {
  describe('Aplicacion Management Component', () => {
    let comp: AplicacionComponent;
    let fixture: ComponentFixture<AplicacionComponent>;
    let service: AplicacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AplicacionComponent],
      })
        .overrideTemplate(AplicacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AplicacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AplicacionService);

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
      expect(comp.aplicacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
