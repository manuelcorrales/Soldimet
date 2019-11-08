import { Component, OnInit } from '@angular/core';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'jhi-presupuesto-detail',
  templateUrl: './presupuesto-detail.component.html',
  styleUrls: ['./presupuesto-detail.component.scss']
})
export class PresupuestoDetailComponent implements OnInit {
  presupuesto: IPresupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.presupuesto = presupuesto;
    });
  }
}
