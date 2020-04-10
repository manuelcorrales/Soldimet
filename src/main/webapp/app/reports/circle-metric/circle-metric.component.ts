import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-circle-metric',
  templateUrl: './circle-metric.component.html',
  styleUrls: ['./circle-metric.component.scss']
})
export class CircleMetricComponent implements OnInit {
  view: any[] = [500, 300];
  legend = false;
  showLabels = true;

  @Input() title = 'Titulo';
  @Input() legendTitle = 'Referencia';
  @Input() legendPosition = 'below';

  @Input() isDoughnut = true;
  @Input() data = [
    {
      name: 'A',
      value: 7300000
    },
    {
      name: 'B',
      value: 8940000
    },
    {
      name: 'C',
      value: 7870000
    },
    {
      name: 'D',
      value: 8270000
    }
  ];

  constructor() {}

  ngOnInit() {}
}
