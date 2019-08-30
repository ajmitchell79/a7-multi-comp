import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() title: string;
  @Input() containerId: string;

  chart: any;
  series: any;

  public options: any = {
      
    chart: {
      type: 'bar'
    },
    legend: {
      enabled: false},
    title: {
      text: this.title
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        dataLabels: {
            enabled: true
        }
    }
      // line: {
      //     marker: {
      //         enabled: false
      //     }
      // }
  },
  xAxis: {
    categories: ['JPMorgan', 'Goldman', 'UPS', 'HSBC', 'Citi'],
    lineWidth: 1,
    gridLineWidth: 0,
    title: {
        text: null
    }
},
yAxis: {
  lineWidth: 1,
  gridLineWidth: 0
},
series:[{
  pointWidth:30,
  name: "Corporate Values",
  data: [
    {y: 43934, name: 'JPMorgan', color: 'red'},
    {y: 57177, name: 'Goldman', color: 'yellow'},
    {y: 97031, name: 'UPS', color: 'green'},
    {y:52503, name: 'HSBC', color: 'purple'},
    {y: 24064, name: 'Citi', color: 'blue'}
  ]}
]
//   series: [{
//     name: 'JPMorgan',
//   //  type: 'line',
//     //data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
//     data: [43934]
// }, {
//     name: 'Goldman Sachs',
//  //   type: 'line',
//     //data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
//     data: [24916]
// }, {
//     name: 'UPS',
//   //  type: 'line',
//     //data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
//     data: [11744]
// }, {
//     name: 'HSBC',
//    // type: 'line',
//     //data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
//     data: [34227,24916, 24916, 24916, 24916]
// }, {
//     name: 'Citi',
//   // type: 'line',
//     //data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
//     data: [12908,24916, 24916, 24916, 24916]
// }]
  };

  constructor() { 
   //debugger;
  }

  ngAfterViewInit()
  {
    this.chart = Highcharts.chart(this.containerId, this.options);
    debugger;
    this.chart.setTitle({text: this.title});
    
  }

  ngOnInit() {

  }

  public updateSeries(series : any[])
  {
debugger;
 //  for(let i=0;i<5; i++)
  // {
  //  this.chart.series[i].setData(series[i],true);
  // }

  //this.chart.series[0].setData([1,2,3,4,5]);
  this.chart.series[0].setData(series[0]);

  }

  // add() {
  //   this.chart.addPoint(Math.floor(Math.random() * 10));
  // }

}
