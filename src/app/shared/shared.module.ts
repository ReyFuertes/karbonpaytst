import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@NgModule({
  declarations: [
    TopNavComponent
  ],
  imports: [ CommonModule ],
  exports: [
    TopNavComponent
  ],
  providers: [],
})
export class SharedModule {}