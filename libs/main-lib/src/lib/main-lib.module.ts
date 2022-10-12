import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageComponent } from './components/page.component';
import { MainLibComponent } from './main-lib.component';
import { ApiService } from './services/api.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [MainLibComponent, PageComponent],
  exports: [MainLibComponent],
  providers: [ApiService],
})
export class MainLibModule {}
