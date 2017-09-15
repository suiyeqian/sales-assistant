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
  // intervalNums = [0, 5, 15, 30, 45];
  // intervalPers = [1.0, 2.3, 3.1, 3.4, 4.0];
  private positionPoint = [0, 12, 27, 45, 66];
  myPctPosition: string;
  myRealPctPosition: string;
  private checkwarningUrl = 'rest/performancetrack/check_warning';
  warningInfos = {};
  @Input() timeProgress: number;

  constructor(
    private bdService: BackendService
  ) {
  }

  ngOnInit() {
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
                data: ['合同金额', '申请单量', '放款单量'],
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
                  splitNumber: 3,
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
                  type: 'line',
                  symbol: 'circle',
                  data: [resData.w1Amt, resData.w2Amt, resData.w3Amt, resData.w4Amt, resData.w5Amt],
                  itemStyle: {
                    normal: {
                      color: '#51c3cd',
                    },
                    opacity: 0
                  },
                  lineStyle: {
                    normal: {
                      color: '#51c3cd',
                      shadowColor: 'rgba(3, 3, 3, 0.26)',
                      shadowBlur: 10,
                      shadowOffsetY: 2,
                      shadowOffsetX: 2
                    }
                  }
                },
                {
                  name: '申请单量',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: [resData.w1AppNumber, resData.w2AppNumber, resData.w3AppNumber, resData.w4AppNumber, resData.w5AppNumber],
                  barWidth: '40%',
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
                  type: 'bar',
                  yAxisIndex: 1,
                  data: [resData.w1Number, resData.w2Number, resData.w3Number, resData.w4Number, resData.w5Number],
                  barGap: 0,
                  barWidth: '40%',
                  itemStyle: {
                    normal: {
                      color: {
                        type: 'linear',
                        x: 0, y: 0,
                        x2: 0, y2: 1,
                        colorStops: [
                          {offset: 0, color: '#fd6204'},
                          {offset: 1, color: '#9a2819'}
                        ],
                      }
                    }
                  }
                },
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
            let resData = res.data;
            // 计算提成系数和位置及预计奖金
            let expectAmt = resData.expectAmt / 10000;
            for (let i = resData.sections.length - 1; i >= 0; i--) {
              if (expectAmt === resData.sections[i]) {
                this.myPctPosition = this.positionPoint[i] + '%';
                resData.coefficient = resData.coefficients[i];
                resData.royaltyAmt = resData.expectAmt * resData.coefficient / 100;
                break;
              }
              if (expectAmt > resData.sections[i]) {
                resData.coefficient = resData.coefficients[i];
                resData.royaltyAmt = resData.expectAmt * resData.coefficient / 100;
                if (i === resData.sections.length - 1) {
                  this.myPctPosition = '73%';
                  break;
                }
                let interval_n = resData.sections[i + 1] - resData.sections[i];
                let interval_p = this.positionPoint[i + 1] - this.positionPoint[i];
                this.myPctPosition = this.positionPoint[i] + (expectAmt - resData.sections[i]) * interval_p / interval_n + '%';
                break;
              }
            }
            // 计算已完成的提成系数的位置及已完成奖金
            let cmpeAmt = resData.cmpeAmt / 10000;
            for (let i = resData.sections.length - 1; i >= 0; i--) {
              if (cmpeAmt === resData.sections[i]) {
                this.myRealPctPosition = this.positionPoint[i] + '%';
                resData.cmpeBonus = resData.cmpeAmt * resData.coefficients[i] / 100;
                break;
              }
              if (cmpeAmt > resData.sections[i]) {
                resData.cmpeBonus = resData.cmpeAmt * resData.coefficients[i] / 100;
                if (i === resData.sections.length - 1) {
                  this.myRealPctPosition = '73%';
                  break;
                }
                let interval_n = resData.sections[i + 1] - resData.sections[i];
                let interval_p = this.positionPoint[i + 1] - this.positionPoint[i];
                this.myRealPctPosition = this.positionPoint[i] + (cmpeAmt - resData.sections[i]) * interval_p / interval_n + '%';
                break;
              }
            }
            this.achieveforecast = resData;
            // console.log(res.data,this.myRealPctPosition,this.myPctPosition);
          }
        });
  }

  getWarning(): void {
    this.bdService
        .getAll(this.checkwarningUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            resData.totalNum = resData.m2Number + resData.m1Number + resData.number;
            resData.cntRate = resData.totalNum / resData.goalCnt;
            resData.totalAmt = resData.m2Amt + resData.m1Amt + resData.amt;
            resData.amtRate = resData.totalAmt / resData.goalAmt;
            this.warningInfos = resData;
          }
        });
  }

}
