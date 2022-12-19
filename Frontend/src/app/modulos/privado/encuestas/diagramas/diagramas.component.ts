import { Component, Input, OnInit } from '@angular/core';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-diagramas',
  templateUrl: './diagramas.component.html',
  styleUrls: ['./diagramas.component.css'],
})
export class DiagramasComponent implements OnInit {
  @Input() public barChartslabels: string[] = [];
  @Input() public barChartData!: any;

  constructor() {}

  ngOnInit(): void {}

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];
  public chartColors: Array<any> = [
    {
      // all colors in order
      backgroundColor: ['#d13537', '#b000b5', '#c0ffee'],
    },
  ];
}
