import { Component, OnInit, AfterContentInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, AfterContentInit {
  private bonustrendUrl = 'rest/performancereview/bonus_trend';
  lineOption = {};

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.getBonusTrend();
    this.waterMark.load({ wmk_txt: JSON.parse(localStorage.user).userName + ' ' + JSON.parse(localStorage.user).userId }, 100);
  }

  ngAfterContentInit() {
    if (document.body.scrollTop > 0) {
      document.body.scrollTop = 0;
    }
  }

  getBonusTrend(): void {
    this.bdService
        .getAll(this.bonustrendUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            let xAxisData = [];
            for (let item of resData.months) {
              xAxisData.push(item + '月');
            }
            this.lineOption = {
              tooltip: {
                show: false
              },
              xAxis:  {
                  type: 'category',
                  data: xAxisData,
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
                    return (value / 10000).toFixed(1);
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
                    data: [resData.m1Amt, resData.m2Amt, resData.m3Amt, resData.m4Amt, resData.m5Amt, resData.m6Amt],
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
          }
        });
  }

}
