import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-risk-control',
  templateUrl: './risk-control.component.html',
  styleUrls: ['./risk-control.component.scss']
})
export class RiskControlComponent implements OnInit {
  riskContrilOption1: any;
  riskContrilOption2: any;
  riskContrilOption3: any;
  constructor() {
  }

  ngOnInit() {
    let commonOption = {
      tooltip : {
        show: false,
      },
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
                  [30 / 100,
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
          data: [{value: 30}]
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
    let option1 = deepCopy(commonOption, {});
    let option2 = deepCopy(commonOption, {});
    let option3 = deepCopy(commonOption, {});
    option2.series[0].axisLine.lineStyle.color[0][0] = 18 / 100;
    option2.series[0].data[0].value = 18;
    option3.series[0].axisLine.lineStyle.color[0][0] = 46 / 100;
    option3.series[0].data[0].value = 46;
    this.riskContrilOption1 = option1;
    this.riskContrilOption2 = option2;
    this.riskContrilOption3 = option3;
  }


}
