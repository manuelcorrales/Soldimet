import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { FormaDePagoComponent } from 'app/entities/forma-de-pago/forma-de-pago.component';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';

describe('Component Tests', () => {
  describe('FormaDePago Management Component', () => {
    let comp: FormaDePagoComponent;
    let fixture: ComponentFixture<FormaDePagoComponent>;
    let service: FormaDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [FormaDePagoComponent],
        providers: []
      })
        .overrideTemplate(FormaDePagoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormaDePagoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormaDePagoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FormaDePago(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.formaDePagos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
