import { Component, OnInit, AfterContentInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, AfterContentInit {
  myInfo = {};
  private mycompUrl = 'rest/personalinfo/my_comp';
  radarOption = {};
  private growthtrackUrl = 'rest/personalinfo/growth_track';
  growthTrack = [];

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    let userInfo = JSON.parse(sessionStorage.user);
    if (userInfo.sex === '男') {
      userInfo.avatarUrl = '/img/man.png';
    } else {
      userInfo.avatarUrl = '/img/woman.png';
    }
    this.myInfo = userInfo;
    this.getMyComp();
    this.getGrowthTrack();
    this.waterMark.load({ wmk_txt: JSON.parse(sessionStorage.user).name + ' ' + JSON.parse(sessionStorage.user).number });
  }

  ngAfterContentInit() {
    if (document.body.scrollTop > 0) {
      document.body.scrollTop = 0;
    }
  }

  getMyComp(): void {
    this.bdService
        .getAll(this.mycompUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            let indicator = [];
            let dataVals = [];
            for (let item of resData) {
              indicator.push({text: item.name, max: 5});
              dataVals.push(item.value);
            }
            this.radarOption = {
              tooltip: { show: false},
              radar: [
                {
                  indicator: indicator,
                  radius: 80,
                  name: {
                    textStyle: {
                      color: '#fdcb04'
                    }
                  },
                  splitLine: {
                    lineStyle: { color: '#43434e' }
                  },
                  splitArea: { show: false },
                  axisLine: { show: false }
                }
              ],
              series: [
                {
                  name: '我的竞争力',
                  type: 'radar',
                  symbol: 'none',
                  lineStyle: {
                    normal: {
                      opacity: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      opacity: 1,
                      color: {
                        type: 'linear',
                        x: 0, y: 0,
                        x2: 0, y2: 1,
                        colorStops: [
                          { offset: 0, color: '#fb9a02' },
                          { offset: 1, color: '#fdbf04' }
                        ]
                      }
                   }
                 },
                  data: [{ value: dataVals }]
                }
              ]
            };
          }
        });
  }

  getGrowthTrack(): void {
    this.bdService
        .getAll(this.growthtrackUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            this.growthTrack = resData;
            this.waterMark.load(
              { wmk_txt: JSON.parse(sessionStorage.user).name + ' ' + JSON.parse(sessionStorage.user).number },
              120 * resData.length);
          }
        });
  }

}
