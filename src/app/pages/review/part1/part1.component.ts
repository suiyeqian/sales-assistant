import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';

@Component({
  selector: 'my-last-month-review',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class LastMonthReviewComponent implements OnInit {
  private pfmcanalysisUrl = 'rest/performancereview/perf_anls';
  pfmcAnalysis = {};
  private pfmctrendUrl = 'rest/performancereview/perf_trend';
  trendOption = {};
  private pfmccompositionUrl = 'rest/performancereview/perf_form';
  pfmcComposition = [];
  legendList = [];
  legendColorList = ['#f3c143', '#ec7c30', '#b3b239', '#dd9261'];
  loanOrderOption: any;
  contractValueOption: any;

  constructor(
    private bdService: BackendService
  ) {
  }

  ngOnInit() {
    this.getPfmcAnalysis();
    this.getPfmcTrend();
    this.getPfmcComposition();
  }

  getPfmcAnalysis(): void {
    this.bdService
        .getAll(this.pfmcanalysisUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.pfmcAnalysis = res.data;
          }
        });
  }

  getPfmcTrend(): void {
    this.bdService
        .getAll(this.pfmctrendUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            let xAxisData = [];
            for (let item of resData.months) {
              xAxisData.push(item + '月');
            }
            this.trendOption = {
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
                  data: xAxisData,
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
                    data: [resData.m1Amt, resData.m2Amt, resData.m3Amt, resData.m4Amt, resData.m5Amt, resData.m6Amt],
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
                    data: [resData.m1Number, resData.m2Number, resData.m3Number, resData.m4Number, resData.m5Number, resData.m6Number],
                    lineStyle: {
                      normal: {
                        color: '#fe4504',
                      }
                    }
                  }
              ]
            };
          }
        });
  }

  getPfmcComposition(): void {
    this.bdService
        .getAll(this.pfmccompositionUrl)
        .then((res) => {
          if ( res.code === 0) {
            let commonOption = {
              tooltip : {
                trigger: 'item',
                formatter: '{b}<br/><span style="color:#fbcb04">{d}%</span>',
                textStyle: { fontSize: 12 }
              },
              color: this.legendColorList,
              series : [
                {
                  type: 'pie',
                  radius : '75%',
                  label: {
                    normal: { show: false }
                  },
                  data: [],
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
            let deepCopy = function(parent, clone) {
              let child = clone || {};
              for (let i in parent) {
                if (!parent.hasOwnProperty(i)) {
                  continue;
                }
                if (typeof parent[i] === 'object') {
                  child[i] = (parent[i].constructor === Array) ? [] : {};
                  deepCopy(parent[i], child[i]);
                } else {
                  child[i] = parent[i];
                }
              }
              return child;
            };
            this.pfmcComposition = res.data;
            let loanOrderChartData = [];
            let cntAmtChartData = [];
            for (let item of res.data) {
              this.legendList.push(item.prodName);
              loanOrderChartData.push({value: item.loanNum, name: item.prodName});
              cntAmtChartData.push({value: item.cntAmt, name: item.prodName});
            }
            this.loanOrderOption = deepCopy(commonOption, {});
            this.loanOrderOption.series[0].data = loanOrderChartData;
            this.contractValueOption = deepCopy(commonOption, {});
            this.contractValueOption.series[0].data = cntAmtChartData;
          }
        });
  }
}
