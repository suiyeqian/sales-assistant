import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  private myrankUrl = 'rest/rankinginfo/my_rank';
  myRank = {};
  private toptenUrl = 'rest/rankinginfo/top_ten';
  topTen = [];

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.getMyRank();
    this.getTopTen();
    this.waterMark.load({ wmk_txt: JSON.parse(localStorage.user).userName + ' ' + JSON.parse(localStorage.user).userId });
  }


  getMyRank(): void {
    this.bdService
        .getAll(this.myrankUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.myRank = res.data;
            console.log(res.data);
          };
        });
  }

  getTopTen(): void {
    this.bdService
        .getAll(this.toptenUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.topTen = res.data;
          };
        });
  }
}
