import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {InfiniteScrollModule,NgxInfiniteScrollService} from 'ngx-infinite-scroll'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(scrollService:NgxInfiniteScrollService){}

 viewModel = {
  screenSelected:0
 };

  title = 'AngularBasics';
  products = [{
    name:"A"
  },
  {
    name:"B"
  },
  {
    name:"C"
  }];

  ngOnInit(){
   
  }

  changedFunction(evt:any) {
    this.viewModel.screenSelected =  evt.currentTarget.selectedIndex

  }
}
