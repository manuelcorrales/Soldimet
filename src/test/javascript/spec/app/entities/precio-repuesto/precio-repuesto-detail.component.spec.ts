import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PrecioRepuestoDetailComponent } from 'app/entities/precio-repuesto/precio-repuesto-detail.component';
import { PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

describe('Component Tests', () => {
  describe('PrecioRepuesto Management Detail Component', () => {
    let comp: PrecioRepuestoDetailComponent;
    let fixture: ComponentFixture<PrecioRepuestoDetailComponent>;
    const route = ({ data: of({ precioRepuesto: new PrecioRepuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PrecioRepuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PrecioRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrecioRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.precioRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
