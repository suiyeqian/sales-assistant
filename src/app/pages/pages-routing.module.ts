import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { TrackComponent } from './track/track.component';

// import { UserService } from '../core/services/user.service';

const pagesRoutes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    // canActivate: [ UserService ],
    children: [
      {
        path: '',
        // canActivateChild: [UserService],
        children: [
          { path: '', redirectTo: 'track', pathMatch: 'full' },
          { path: 'track', component: TrackComponent },
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'pages/track' }
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}