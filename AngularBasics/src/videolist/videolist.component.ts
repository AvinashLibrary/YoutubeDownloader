import { Component,OnInit } from '@angular/core';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataDownloaderService } from 'src/data-downloader.service';


import {Listitem,pagination} from './listitem'

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
}) 



 

export class VideolistComponent {
  constructor(private loadListData: DataDownloaderService){ }
  uiData : Listitem[] = []
  private noOfItemsToShowInitially: number = 2;
  // itemsToLoad - number of new items to be displayed
  private itemsToLoad: number = 2;
  // 18 items loaded for demo purposes


   // List that is going to be actually displayed to user
   public itemsToShow = this.uiData.slice(0, this.noOfItemsToShowInitially);
   // No need to call onScroll if full list has already been displayed
   public isFullListDisplayed: boolean = false;

   public scrollWindow : boolean= false;

   public totalItems : number = 0 ;
  //  Interface usage


  




  folders  = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  ngOnInit(){
    this.loadUIData({$skip:0,$top:2})
  }

  loadUIData(serviceAttr:pagination){
    this.loadListData.getpostList(serviceAttr).subscribe((response: any) => {
      this.uiData = [...this.uiData,...response.body.map((val:any)=>({fileName:val.fileName,fileId:val.fileId,user:val.user,fileType:val.fileType}))];
      this.totalItems = parseInt(response.headers.get('docCount'));
      // this.itemsToShow = this.uiData.slice(0, this.noOfItemsToShowInitially);
    })
  }

  onScroll() {
    if(this.totalItems >= this.itemsToLoad){
      this.loadUIData({$skip:this.itemsToLoad,$top:2});
      this.itemsToLoad = this.itemsToLoad + 2 ;
    }
   
  }

  focusOutFunction(oEvt:any){
    oEvt.currentTarget.pause()
  }

  focusFunction(oEvt:any){
    oEvt.currentTarget.play()
  }

  

  




}
