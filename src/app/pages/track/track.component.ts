import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { WaterMarkService } from '../../core/services/watermark.service';

@Component({
  selector: 'my-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  today = new Date();
  performancetrackUrl = 'rest/performancetrack/app_track';
  overdueremindUrl = 'rest/performancetrack/over_remind';
  pageLength = 5;
  performancetracks: Array<any>;
  displayPerformance = [];
  pfmtckPages = [];
  pfmtckCurPage = 1;
  overduereminds: Array<any>;
  displayOverdue = [];
  overduermdPages = [];
  overduermdCurPage = 1;

  constructor(
    private bdService: BackendService,
    private waterMark: WaterMarkService
  ) {
  }

  ngOnInit() {
    this.getPerformanceTrack();
    this.getOverdueRemind();
    this.waterMark.load({ wmk_txt: JSON.parse(localStorage.user).userName + ' ' + JSON.parse(localStorage.user).userId });
  }

  getPerformanceTrack(): void {
    this.bdService
        .getAll(this.performancetrackUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.performancetracks = res.data;
            let pageNum = Math.ceil( this.performancetracks.length / this.pageLength);
            for (let i = 0; i < pageNum; i ++) {
              this.pfmtckPages.push(i);
            }
            this.displayPerformance =
            this.performancetracks.slice(this.pageLength * (this.pfmtckCurPage - 1), this.pageLength * this.pfmtckCurPage);
          }
        });
  }

  getOverdueRemind(): void {
    this.bdService
        .getAll(this.overdueremindUrl)
        .then((res) => {
          if ( res.code === 0) {
            this.overduereminds = res.data;
            let pageNum = Math.ceil( this.overduereminds.length / this.pageLength);
            for (let i = 0; i < pageNum; i ++) {
              this.overduermdPages.push(i);
            }
            this.displayOverdue =
            this.overduereminds.slice(this.pageLength * (this.overduermdCurPage - 1), this.pageLength * this.overduermdCurPage);
          }
        });
  }

  swipe(currentIndex: number, action = 'swipeleft', target: string) {
        if (action === 'swiperight') {
          if (currentIndex - 1 < 1) {
            return;
          }
          if (target === 'performancetrack') {
            this.pfmtckCurPage = currentIndex - 1;
            this.displayPerformance =
            this.performancetracks.slice(this.pageLength * (this.pfmtckCurPage - 1), this.pageLength * this.pfmtckCurPage);
          } else if (target === 'overdueremind') {
            this.overduermdCurPage = currentIndex - 1;
            this.displayOverdue =
            this.overduereminds.slice(this.pageLength * (this.overduermdCurPage - 1), this.pageLength * this.overduermdCurPage);
          }

        }

        if (action === 'swipeleft') {
          if (target === 'performancetrack') {
            if (currentIndex + 1 > this.pfmtckPages.length) {
              return;
            }
            this.pfmtckCurPage = currentIndex + 1;
            this.displayPerformance =
            this.performancetracks.slice(this.pageLength * (this.pfmtckCurPage - 1), this.pageLength * this.pfmtckCurPage);
          } else if (target === 'overdueremind') {
            if (currentIndex + 1 > this.overduermdPages.length) {
              return;
            }
            this.overduermdCurPage = currentIndex + 1;
            this.displayOverdue =
            this.overduereminds.slice(this.pageLength * (this.overduermdCurPage - 1), this.pageLength * this.overduermdCurPage);
          }
        }

    }

}
