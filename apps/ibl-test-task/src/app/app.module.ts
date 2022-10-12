import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLibModule } from '@ibl-test-task/main-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainLibModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
