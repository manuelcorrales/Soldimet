import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaRepuestoComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto.component';
import { CobranzaRepuestoService } from 'app/entities/cobranza-repuesto/cobranza-repuesto.service';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

describe('Component Tests', () => {
  describe('CobranzaRepuesto Management Component', () => {
    let comp: CobranzaRepuestoComponent;
    let fixture: ComponentFixture<CobranzaRepuestoComponent>;
    let service: CobranzaRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CobranzaRepuestoComponent],
        providers: []
      })
        .overrideTemplate(CobranzaRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CobranzaRepuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CobranzaRepuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CobranzaRepuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cobranzaRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
