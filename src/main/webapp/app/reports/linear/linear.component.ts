import { Component, OnInit, Input } from '@angular/core';
import { DtoNameSeries } from 'app/dto/dto-reportes/dto-serie';

@Component({
  selector: 'jhi-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
})
export class LinearComponent implements OnInit {
  @Input() metric = 'Cajas por sucursal';

  legend = true;
  legendTitle = 'Sucursales';
  legendPosition = 'right';

  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  @Input() data: DtoNameSeries[] = [
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
