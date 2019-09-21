import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { HistorialPrecioDetailComponent } from 'app/entities/historial-precio/historial-precio-detail.component';
import { HistorialPrecio } from 'app/shared/model/historial-precio.model';

describe('Component Tests', () => {
  describe('HistorialPrecio Management Detail Component', () => {
    let comp: HistorialPrecioDetailComponent;
    let fixture: ComponentFixture<HistorialPrecioDetailComponent>;
    const route = ({ data: of({ historialPrecio: new HistorialPrecio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [HistorialPrecioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistorialPrecioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorialPrecioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historialPrecio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
