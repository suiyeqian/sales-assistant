import { Component, OnInit } from '@angular/core';

import { BackendService } from '../core/services/backend.service';
import { SpinnerService } from '../core/services/spinner.service';
// import { WaterMarkService } from '../core/services/watermark.service';

@Component({
  selector: 'my-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  user = Object.assign({});
  private userUrl = 'rest/personalinfo/my_info';

  constructor(
    private bdService: BackendService,
    private spinner: SpinnerService,
    // private waterMark: WaterMarkService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
     this.bdService
         .getAll(this.userUrl)
         .then((res) => {
           if ( res.code === 0) {
             localStorage.clear();
             sessionStorage.clear();
             sessionStorage.setItem('user', JSON.stringify(res.data));
             this.spinner.hide();
           }
         });
  }
}
