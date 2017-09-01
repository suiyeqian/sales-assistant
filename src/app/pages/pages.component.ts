import { Component, OnInit } from '@angular/core';

// import { BackendService } from '../core/services/backend.service';
import { SpinnerService } from '../core/services/spinner.service';
import { WaterMarkService } from '../core/services/watermark.service';

@Component({
  selector: 'my-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  user = Object.assign({});

  constructor(
    // private bdService: BackendService,
    private spinner: SpinnerService,
    private waterMark: WaterMarkService,
  ) { }

  ngOnInit() {
    this.getUser();
    this.waterMark.load({ watermark_txt: '张小，xn042356' });
  }

  getUser(): void {
    //  this.bdService
    //      .getItemsByJsonParams('user/find_user_by_ticket', {})
    //      .then((res) => {
    //        this.user = res;
    //        localStorage.setItem('user', JSON.stringify(res));
           this.spinner.hide();
    //      });
  }
}
