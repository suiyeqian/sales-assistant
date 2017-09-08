import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';

@Component({
  selector: 'my-risk-control',
  templateUrl: './risk-control.component.html',
  styleUrls: ['./risk-control.component.scss']
})
export class RiskControlComponent implements OnInit {
  private riskcontrolUrl = 'rest/performancetrack/risk_management';
  riskControl = {};
  riskControlOption1: any;
  riskControlOption2: any;
  riskControlOption3: any;

  constructor(
    private bdService: BackendService
  ) {
  }

  ngOnInit() {
    this.getRiskcontrol();
  }

  getRiskcontrol(): void {
    this.bdService
        .getAll(this.riskcontrolUrl)
        .then((res) => {
          if ( res.code === 0) {
            let commonOption = {
              tooltip : { show: false },
              series: [
                {
                  type: 'gauge',
                  startAngle: 180,
                  endAngle: 0,
                  radius: '95%',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: [
                        [0,
                          {
                            type: 'linear',
                            x: 0, y: 0,
                            x2: 1, y2: 0,
                            colorStops: [
                              { offset: 0, color: '#fdbf04'},
                              { offset: 1, color: '#fb9a02'}
                            ],
                          }
                        ],
                        [1, '#363125']
                      ],
                      width: 23
                    }
                  },
                  splitLine: { show: false },
                  axisTick: { show: false },
                  axisLabel: { show: false },
                  pointer: { show: false },
                   detail : {
                    show : true,
                    offsetCenter: [0, -15],
                    formatter: '{value}%',
                    textStyle: {
                        fontSize : 20,
                        color: '#fe4504',
                        fontWeight: 'bold'
                    }
                  },
                  data: [{value: 0}]
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
            this.riskControl = res.data;
            let resData = res.data;
            this.riskControlOption1 = deepCopy(commonOption, {});
            this.riskControlOption1.series[0].axisLine.lineStyle.color[0][0] = resData.overDueAmt / resData.loanAmt;
            this.riskControlOption1.series[0].data[0].value = (resData.overDueAmt * 100 / resData.loanAmt).toFixed(2);
            this.riskControlOption2 = deepCopy(commonOption, {});
            this.riskControlOption2.series[0].axisLine.lineStyle.color[0][0] = resData.overDueNumber / resData.loanNumber;
            this.riskControlOption2.series[0].data[0].value = (resData.overDueNumber * 100 / resData.loanNumber).toFixed(2);
            this.riskControlOption3 = deepCopy(commonOption, {});
            this.riskControlOption3.series[0].axisLine.lineStyle.color[0][0] = resData.m2Amt / resData.cAmt;
            this.riskControlOption3.series[0].data[0].value = (resData.m2Amt * 100 / resData.cAmt).toFixed(2);
          }
        });
  }
}
