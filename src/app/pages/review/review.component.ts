import { Component, OnInit } from '@angular/core';

import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  lineOption = {
    tooltip: {
      show: false
    },
    xAxis:  {
        type: 'category',
        data: ['2月', '3月', '4月', '5月', '6月', '7月'],
        axisTick: { show: false },
        axisLabel: {
          textStyle: {
            color: '#ccc'
          }
        }
    },
    yAxis: {
      type: 'value',
      name: '单位(万元)',
      nameTextStyle: {
        color: '#ccc'
      },
      splitNumber: 3,
      axisTick: { show: false },
      axisLabel: {
        formatter:  function (value) {
          return (value / 10000).toFixed(0);
        },
        textStyle: {
          color: '#ccc'
        }
      },
      axisLine: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#3a3b45']
        }
      },
    },
    color: ['#fe4504'],
    textStyle: {
      color: '#fdcb04'
    },
    series: [
      {
          type: 'line',
          data: [18000, 16700, 21000, 19200, 22000, 20000],
          label: {
            normal: {
             show: true,
             position: 'bottom',
             fontSize: 14
           }
          },
          symbol: 'circle',
          symbolSize: 10
      }
    ]
  };

  constructor(
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.waterMark.load({ wmk_txt: JSON.parse(localStorage.user).userName + ' ' + JSON.parse(localStorage.user).userId });
  }

}
