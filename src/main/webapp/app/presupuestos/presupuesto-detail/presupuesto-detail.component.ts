import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-presupuesto-detail',
  templateUrl: './presupuesto-detail.component.html',
  styleUrls: ['./presupuesto-detail.component.scss']
})
export class PresupuestoDetailComponent implements OnInit {
  presupuesto: Presupuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.presupuesto = presupuesto;
      // eslint-disable-next-line no-console
      console.log(this.presupuesto);
    });
  }
}
