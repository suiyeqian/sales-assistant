import { Component } from '@angular/core';

@Component({
  selector: 'my-month-performance',
  templateUrl: './month-performance.component.html',
  styleUrls: ['./month-performance.component.scss']
})
export class MonthPerformanceComponent {
  // 周业绩趋势图
  trendOption = {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type : 'shadow'
      }
    },
    calculable : true,
    legend: {
      data: ['合同金额', '放款单量'],
      right: 0,
      textStyle: {
        color: '#ccc'
      }
    },
    xAxis : [
      {
        type: 'category',
        data: ['W1', 'W2', 'W3', 'W4', 'W5'],
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: '#ccc'
          }
        },
      }
    ],
    yAxis : [
      {
        type : 'value',
        name: '单位(万元)',
        nameTextStyle: {
          color: '#ccc'
        },
        splitNumber: 3,
        axisTick: { show: false },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#ccc'
          }
        },
        axisLine: { show: false },
        splitLine: { show: false },
      },
      {
        type : 'value',
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: '#ccc'
          }
        },
        axisLine: { show: false },
        splitLine: { show: false },
      }
    ],
    series : [
        {
          name: '合同金额',
          type: 'bar',
          data: [11, 13, 4, 0, 0],
          barWidth: '55%',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0, y: 0,
                x2: 0, y2: 1,
                colorStops: [
                  {offset: 0, color: '#fdbf04'},
                  {offset: 1, color: '#fb9a02'}
                ],
              }
            }
          }
        },
        {
          name: '放款单量',
          type: 'line',
          yAxisIndex: 1,
          data: [6, 8, 2, 0, 0],
          lineStyle: {
            normal: {
              color: '#fe4504',
            }
          }
        }
    ]
  };

  constructor() {
  }

}
