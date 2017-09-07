import { Component } from '@angular/core';

@Component({
  selector: 'my-last-month-review',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class LastMonthReviewComponent {
  // 6月业绩趋势
  trendOption = {
    tooltip: {
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
        data: ['2月', '3月', '4月', '5月', '6月', '7月'],
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
          data: [11, 13, 4, 6, 8, 15],
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
          data: [26, 28, 22, 30, 36, 40],
          lineStyle: {
            normal: {
              color: '#fe4504',
            }
          }
        }
    ]
  };
  // 饼图
  loanOrderOption = {
    tooltip : {
      trigger: 'item',
      formatter: '{b}<br/><span style="color:#fbcb04">{d}%</span>',
      textStyle: { fontSize: 12 }
    },
    color: ['#f3c143', '#ec7c30', '#b3b239', '#dd9261'],
    series : [
      {
        type: 'pie',
        radius : '75%',
        label: {
          normal: { show: false }
        },
        data: [
          {value: 335, name: '工薪贷'},
          {value: 210, name: '精英贷'},
          {value: 34, name: '按揭贷'},
          {value: 35, name: '保单贷'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
};
  legendList = ['工薪贷', '精英贷', '按揭贷', '保单贷'];
  legendColorList = ['#f3c143', '#ec7c30', '#b3b239', '#dd9261'];

  constructor() {
  }

}
