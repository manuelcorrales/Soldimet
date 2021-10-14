import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EstadoOperacionService } from '../service/estado-operacion.service';

import { EstadoOperacionComponent } from './estado-operacion.component';

describe('Component Tests', () => {
  describe('EstadoOperacion Management Component', () => {
    let comp: EstadoOperacionComponent;
    let fixture: ComponentFixture<EstadoOperacionComponent>;
    let service: EstadoOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EstadoOperacionComponent],
      })
        .overrideTemplate(EstadoOperacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoOperacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EstadoOperacionService);

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
      expect(comp.estadoOperacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
