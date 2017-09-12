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

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.getMyInfo();
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
