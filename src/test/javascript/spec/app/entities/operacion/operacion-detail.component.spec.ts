import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { OperacionDetailComponent } from 'app/entities/operacion/operacion-detail.component';
import { Operacion } from 'app/shared/model/operacion.model';

describe('Component Tests', () => {
  describe('Operacion Management Detail Component', () => {
    let comp: OperacionDetailComponent;
    let fixture: ComponentFixture<OperacionDetailComponent>;
    const route = ({ data: of({ operacion: new Operacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [OperacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.operacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
