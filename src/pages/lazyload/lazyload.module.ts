import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LazyloadPage } from './lazyload';

@NgModule({
  declarations: [
    LazyloadPage,
  ],
  imports: [
    IonicPageModule.forChild(LazyloadPage),
  ],
})
export class LazyloadPageModule {}
