import { Component, OnInit, AfterContentInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, AfterContentInit {
  private myinfoUrl = 'rest/personalinfo/my_info';
  myInfo = {};
  avatarUrl: string;
  radarOption = {};

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.getMyInfo();
    this.radarOption = {
      tooltip: { show: false},
      radar: [
        {
          indicator: [
            {text: 'C-M2', max: 5},
            {text: '申请单量', max: 5},
            {text: '件均金额', max: 5},
            {text: '合同金额', max: 5},
            {text: '通过率', max: 5}
          ],
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
          data: [{ value: [1, 2, 5, 2, 2] }]
        }
      ]
    };
    this.waterMark.load({ wmk_txt: JSON.parse(localStorage.user).userName + ' ' + JSON.parse(localStorage.user).userId });
  }

  ngAfterContentInit() {
    if (document.body.scrollTop > 0) {
      document.body.scrollTop = 0;
    }
  }

  getMyInfo(): void {
    this.bdService
        .getAll(this.myinfoUrl)
        .then((res) => {
          if ( res.code === 0) {
            let resData = res.data;
            this.myInfo = res.data;
            if (res.data.sex === '男') {
              this.avatarUrl = '/img/man.png';
            } else {
              this.avatarUrl = '/img/woman.png';
            }
            console.log(resData);
          }
        });
  }

}
