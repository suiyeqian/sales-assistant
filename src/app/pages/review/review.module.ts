import { NgModule } from '@angular/core';

import { ReviewComponent } from './review.component';

import { SharedModule } from '../../shared/shared.module';
import { RibbonModule } from '../../my-components/ribbon/ribbon.module';

import { AngularEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    SharedModule,
    AngularEchartsModule,
    RibbonModule
  ],
  declarations: [
    ReviewComponent
  ],
  exports: [ ],
  providers: [ ]
})
export class ReviewModule { }
