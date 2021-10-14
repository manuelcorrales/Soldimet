import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CostoRepuestoService } from '../service/costo-repuesto.service';

import { CostoRepuestoComponent } from './costo-repuesto.component';

describe('Component Tests', () => {
  describe('CostoRepuesto Management Component', () => {
    let comp: CostoRepuestoComponent;
    let fixture: ComponentFixture<CostoRepuestoComponent>;
    let service: CostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoRepuestoComponent],
      })
        .overrideTemplate(CostoRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CostoRepuestoService);

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
      expect(comp.costoRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
