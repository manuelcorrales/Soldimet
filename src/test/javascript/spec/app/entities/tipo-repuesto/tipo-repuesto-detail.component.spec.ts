import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoRepuestoDetailComponent } from 'app/entities/tipo-repuesto/tipo-repuesto-detail.component';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

describe('Component Tests', () => {
  describe('TipoRepuesto Management Detail Component', () => {
    let comp: TipoRepuestoDetailComponent;
    let fixture: ComponentFixture<TipoRepuestoDetailComponent>;
    const route = ({ data: of({ tipoRepuesto: new TipoRepuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoRepuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoRepuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoRepuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoRepuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
