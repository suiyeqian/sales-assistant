import { NgModule } from '@angular/core';

import { RibbonComponent } from './ribbon.component';

// import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    // SharedModule
  ],
  declarations: [
    RibbonComponent
  ],
  exports: [
    RibbonComponent
  ]
})
export class RibbonModule { }
