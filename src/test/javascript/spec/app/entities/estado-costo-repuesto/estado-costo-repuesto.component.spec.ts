import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCostoRepuestoComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.component';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';
import { EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

describe('Component Tests', () => {
  describe('EstadoCostoRepuesto Management Component', () => {
    let comp: EstadoCostoRepuestoComponent;
    let fixture: ComponentFixture<EstadoCostoRepuestoComponent>;
    let service: EstadoCostoRepuestoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoCostoRepuestoComponent],
        providers: []
      })
        .overrideTemplate(EstadoCostoRepuestoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCostoRepuestoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoCostoRepuestoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoCostoRepuesto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoCostoRepuestos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
