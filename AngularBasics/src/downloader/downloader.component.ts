import { Component } from '@angular/core';
import { DataDownloaderService } from 'src/data-downloader.service';
import {MatSelectModule} from '@angular/material/select';
import {FormControl} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';




interface Food {
  value: string;
  viewValue: string;
}

interface platform {
  key: string;
  value: string;
}



@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.css']
})


export class DownloaderComponent {
  constructor(private loadListData: DataDownloaderService){}
  youTubeData:any= [];
  userUrl :string = ""
  foods: Food[] = [
    {value: 'video', viewValue: 'video-audio'},
    {value: 'video-no', viewValue: 'video'},
    {value: 'audio', viewValue: 'audio'},
  ];

  Platforms :platform[] =[
    {"key":"inst","value":"Instagram"},
    {"key":"youtube","value":"Youtube"}
  ]


  color: ThemePalette = "accent";
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  

  mimeTypeSel = new FormControl('');
  userUrlF = new FormControl('');
  platformVal = new FormControl('');
  previewUrl :any = [];
  selectedPlatform:any = '';

  ngOnInit(){
    
  }

  loadPlatform(evt:Event){
    debugger
    if(this.userUrlF.value?.includes('inst')){
      this.selectedPlatform = "inst";

    }else if(this.userUrlF.value?.includes('you')){
      this.selectedPlatform = "youtube";
      
    }
    
  }


  generateVideoAndAudio(){
    this.loadListData.getYoutubeData(this.userUrlF.value).subscribe((response: any) => {
      var valueKey = (this.mimeTypeSel.getRawValue() as any).value;

      if(this.selectedPlatform ===  "inst"){
        this.youTubeData = response.body.yStreamData.video;
        this.youTubeData[0].url = this.youTubeData[0].contentUrl;
        this.youTubeData[0].qualityLabel = '360P'
        this.youTubeData[0].audioQuality = 'AUDIO_QUALITY_MEDIUM'
        this.previewUrl = [this.youTubeData[0]];
      }else{

      if(valueKey === 'video'){
        this.youTubeData = response.body.formats;
        this.previewUrl = [this.youTubeData[0]];
      }else if(valueKey === 'audio'){
        this.youTubeData =  response.body.adaptiveFormats.filter((val:any)=> val.mimeType.includes("audio"))
      }else if(valueKey === 'video-no'){
        this.youTubeData =  response.body.adaptiveFormats.filter((val:any)=> val.mimeType.includes("video"))
      }
    }
    })
   
  }

  generateBufferAndDownload3(item:any){

    var myVidepoTag = document.getElementById('videoPreview')
    // var getSelected = item;
    // let link:any= document.createElement('a');
    // link.hidden = true;
    // link.setAttribute('download',"alpha")
    // link.href = getSelected.url; 
    // document.body.appendChild(link);
    // link.click();
   };
  

  generateBufferAndDownload(item:any){
    debugger
    var getSelected = item;
    this.previewUrl = [item];

/* Low performance code but useful
 */  
    // this.loadListData.downloadContent(getSelected.url).subscribe((data)=>{
    //   let blob = new Blob([data], {type: 'video/mp4'});
    //   let link:any= document.createElement('a');
    //   link.hidden = true;
    //   link.setAttribute('download',"alpha")
    //   // var myUrl = URL.createObjectURL(blob);

    //   let reader = new FileReader();
    //   reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

    //   reader.onload = function() {
    //     link.href = reader.result; // data url
    //     link.click();
    //   };
      
      
    // })
  }
}
