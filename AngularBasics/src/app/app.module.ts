import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import {  UploaderComponent } from '../uploader/uploader.component';
import {  DownloaderComponent } from '../downloader/downloader.component';
import { VideolistComponent } from '../videolist/videolist.component';

import {DataUploaderService} from 'src/data-uploader.service';
import {DataDownloaderService} from 'src/data-downloader.service'


import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import {MatSelectModule} from '@angular/material/select';

import {MatIconModule} from '@angular/material/icon';
import {MatListModule,MatListOption} from '@angular/material/list';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';









@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    DownloaderComponent,
    VideolistComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatIconModule,
    MatListModule,
    InfiniteScrollModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [DataUploaderService,DataDownloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
