import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MedidaArticuloComponent } from 'app/entities/medida-articulo/medida-articulo.component';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';

describe('Component Tests', () => {
  describe('MedidaArticulo Management Component', () => {
    let comp: MedidaArticuloComponent;
    let fixture: ComponentFixture<MedidaArticuloComponent>;
    let service: MedidaArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedidaArticuloComponent],
        providers: []
      })
        .overrideTemplate(MedidaArticuloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedidaArticuloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedidaArticuloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedidaArticulo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medidaArticulos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
