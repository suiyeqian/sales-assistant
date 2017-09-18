import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { BackendService } from '../core/services/backend.service';
import { SpinnerService } from '../core/services/spinner.service';
// import { WaterMarkService } from '../core/services/watermark.service';

@Component({
  selector: 'my-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.route.data
    .subscribe((data) => {
      sessionStorage.clear();
      sessionStorage.setItem('user', JSON.stringify(data.userInfo));
      this.spinner.hide();
    });
  }
}
