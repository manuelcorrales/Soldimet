import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoRepuestoService } from '../service/tipo-repuesto.service';

import { TipoRepuestoComponent } from './tipo-repuesto.component';

describe('Component Tests', () => {
  describe('TipoRepuesto Management Component', () => {
    let comp: TipoRepuestoComponent;
    let fixture: ComponentFixture<TipoRepuestoComponent>;
    let service: TipoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoRepuestoComponent],
      })
        .overrideTemplate(TipoRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoRepuestoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TipoRepuestoService);

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
      expect(comp.tipoRepuestos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
