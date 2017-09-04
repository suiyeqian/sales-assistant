import { Component } from '@angular/core';

@Component({
  selector: 'my-month-performance',
  templateUrl: './month-performance.component.html',
  styleUrls: ['./month-performance.component.scss']
})
export class MonthPerformanceComponent {
  // 销售进度饼图
  saleProgressOption = {
    series : [
      {
        type : 'pie',
        radius : [40, 60],
        itemStyle : {
          normal : {
            label : {
              formatter : '销售进度',
              textStyle: {
                color: '#ccc',
                fontSize : 12,
                baseline : 'top'
              }
            }
          },
        },
        data : [
          {
            name: '销售进度', value: 70,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0, y: 0,
                  x2: 0, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#fdbf04'},
                    { offset: 1, color: '#fb9a02'}
                  ],
                },
                label : {
                  show : true,
                  position : 'center',
                  formatter : '{c}%',
                  textStyle: {
                    color: '#fe4504',
                    fontSize : 18,
                    fontWeight : 'bold',
                    baseline : 'bottom'
                  }
                },
                labelLine : {
                  show : false
                }
              }
            }
          },
          {
            name: 'other', value: 30,
            itemStyle: {
              normal: {
                color: '#352e28',
                label: {
                  show: true,
                  position: 'center'
                },
                labelLine: { show : false }
              },
              // emphasis: { color: 'rgba(0,0,0,0)' }
            }
          },
        ]
      },
    ]
  };
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
