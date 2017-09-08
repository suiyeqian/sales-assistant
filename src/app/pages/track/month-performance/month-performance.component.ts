import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';

@Component({
  selector: 'my-month-performance',
  templateUrl: './month-performance.component.html',
  styleUrls: ['./month-performance.component.scss']
})
export class MonthPerformanceComponent implements OnInit {
  private weeklytrendUrl = 'rest/performancetrack/weekly_trend';
  trendOption = {};
  private achieveforecastUrl = 'rest/performancetrack/achievement_forecast';
  achieveforecast = {};
  intervalNums = [0, 5, 15, 30, 45];
  intervalPers = [1.0, 2.3, 3.1, 3.4, 4.0];
  private positionPoint = [0, 12, 27, 45, 66];
  myPctPosition: string;
  private checkwarningUrl = 'rest/performancetrack/check_warning';
  timeList = [];
  warningInfos = {};
  @Input() timeProgress: number;

  constructor(
    private bdService: BackendService
  ) {
  }

  ngOnInit() {
    let getlastMonth = new Date().getMonth();
    let lastMonth = (+getlastMonth === 0) ? 12 : getlastMonth;
    let last2Month = (+lastMonth - 1 === 0) ? 12 : (lastMonth - 1);
    this.timeList = [last2Month, lastMonth, getlastMonth + 1];
    this.getWeeklyTrend();
    this.getAchieveForecast();
    this.getWarning();
  }

  getWeeklyTrend(): void {
    this.bdService
        .getAll(this.weeklytrendUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            this.trendOption = {
              tooltip : {
                trigger: 'axis',
                axisPointer: { type : 'shadow' }
              },
              calculable : true,
              legend: {
                data: ['合同金额', '放款单量'],
                right: 0,
                textStyle: { color: '#ccc' }
              },
              xAxis : [
                {
                  type: 'category',
                  data: ['W1', 'W2', 'W3', 'W4', 'W5'],
                  axisTick: { show: false },
                  axisLabel: {
                    textStyle: { color: '#ccc' }
                  },
                }
              ],
              yAxis: [
                {
                  type : 'value',
                  name: '单位(万元)',
                  nameTextStyle: { color: '#ccc' },
                  splitNumber: 3,
                  axisTick: { show: false },
                  axisLabel: {
                    formatter: '{value}',
                    textStyle: { color: '#ccc' }
                  },
                  axisLine: { show: false },
                  splitLine: { show: false },
                },
                {
                  type : 'value',
                  axisTick: { show: false },
                  axisLabel: {
                    textStyle: { color: '#ccc' }
                  },
                  axisLine: { show: false },
                  splitLine: { show: false },
                }
              ],
              series: [
                {
                  name: '合同金额',
                  type: 'bar',
                  data: [resData.w1Amt, resData.w2Amt, resData.w3Amt, resData.w4Amt, resData.w5Amt],
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
                  data: [resData.w1Number, resData.w2Number, resData.w3Number, resData.w4Number, resData.w5Number],
                  lineStyle: {
                    normal: { color: '#fe4504' }
                  }
                }
              ]
            };
          }
        });
  }

  getAchieveForecast(): void {
    this.bdService
        .getAll(this.achieveforecastUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.achieveforecast = res.data;
            // 计算提成系数的位置
            let expectAmt = res.data.expectAmt / 10000;
            for (let i = this.intervalNums.length - 1; i >= 0; i--) {
              if (expectAmt === this.intervalNums[i]) {
                this.myPctPosition = this.positionPoint[i] + '%';
                break;
              }
              if (expectAmt > this.intervalNums[i]) {
                if (i === this.intervalNums.length - 1) {
                  this.myPctPosition = '73%';
                  break;
                }
                let interval_n = this.intervalNums[i + 1] - this.intervalNums[i];
                let interval_p = this.positionPoint[i + 1] - this.positionPoint[i];
                this.myPctPosition = this.positionPoint[i] + (expectAmt - this.intervalNums[i]) * interval_p / interval_n + '%';
                break;
              }
            }
          }
        });
  }

  getWarning(): void {
    this.bdService
        .getAll(this.checkwarningUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.warningInfos = res.data;
          }
        });
  }

}
