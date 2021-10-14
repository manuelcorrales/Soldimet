import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-card-bars',
  templateUrl: './card-bars.component.html',
  styleUrls: ['./card-bars.component.scss'],
})
export class CardBarsComponent implements OnInit {
  @Input() metric = 'Cajas Hoy por sucursal';

  legend = true;
  legendTitle = 'Sucursales';
  legendPosition = 'below';

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28'],
  };

  @Input() data = [
    {
      name: 'San Martin',
      series: [],
    },
    {
      name: 'Guaymallen',
      series: [],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
