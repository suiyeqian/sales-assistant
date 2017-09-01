import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  today = new Date();

  constructor() {
  }

  ngOnInit() {
  }

}
