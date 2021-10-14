import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DetallMovimientoService } from '../service/detall-movimiento.service';

import { DetallMovimientoComponent } from './detall-movimiento.component';

describe('Component Tests', () => {
  describe('DetallMovimiento Management Component', () => {
    let comp: DetallMovimientoComponent;
    let fixture: ComponentFixture<DetallMovimientoComponent>;
    let service: DetallMovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetallMovimientoComponent],
      })
        .overrideTemplate(DetallMovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallMovimientoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DetallMovimientoService);

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
      expect(comp.detallMovimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
