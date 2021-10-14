import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MedioDePagoService } from '../service/medio-de-pago.service';

import { MedioDePagoComponent } from './medio-de-pago.component';

describe('Component Tests', () => {
  describe('MedioDePago Management Component', () => {
    let comp: MedioDePagoComponent;
    let fixture: ComponentFixture<MedioDePagoComponent>;
    let service: MedioDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MedioDePagoComponent],
      })
        .overrideTemplate(MedioDePagoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MedioDePagoService);

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
      expect(comp.medioDePagos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
