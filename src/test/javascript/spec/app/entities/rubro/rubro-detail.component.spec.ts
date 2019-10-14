import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { RubroDetailComponent } from 'app/entities/rubro/rubro-detail.component';
import { Rubro } from 'app/shared/model/rubro.model';

describe('Component Tests', () => {
  describe('Rubro Management Detail Component', () => {
    let comp: RubroDetailComponent;
    let fixture: ComponentFixture<RubroDetailComponent>;
    const route = ({ data: of({ rubro: new Rubro(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [RubroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RubroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RubroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rubro).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
