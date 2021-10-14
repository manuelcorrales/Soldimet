import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CostoOperacionService } from '../service/costo-operacion.service';

import { CostoOperacionComponent } from './costo-operacion.component';

describe('Component Tests', () => {
  describe('CostoOperacion Management Component', () => {
    let comp: CostoOperacionComponent;
    let fixture: ComponentFixture<CostoOperacionComponent>;
    let service: CostoOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoOperacionComponent],
      })
        .overrideTemplate(CostoOperacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoOperacionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CostoOperacionService);

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
      expect(comp.costoOperacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
