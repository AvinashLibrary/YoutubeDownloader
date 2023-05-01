import { Component } from '@angular/core';
import { DataUploaderService } from 'src/data-uploader.service';




@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})


export class UploaderComponent {
  constructor(private dataUplodService: DataUploaderService) { }

  connection = false;
  performanceMonitor = {
    arrayBufferPer: 0,
    arrayBufferPerComplete: false,
    uploadedArr: false,
    urlPer: 0,
    urlPerComplete: false,
    uploadedurl: false,
    textPer: 0,
    textPerComplete: false,
    uploadedtext: false,
    stringPer: 0,
    stringPerComplete: false,
    uploadedstring: false
  }
  config: DataUploaderService | undefined;

  checkConnection() {
    this.dataUplodService.getConfig().subscribe((data) => {
      console.log(data);
      this.connection = true
    })

  }

  loadFileToAll() {
    document.getElementById('fileUploader1')?.click()
    document.getElementById('fileUploader2')?.click()
    document.getElementById('fileUploader3')?.click()
    document.getElementById('fileUploader4')?.click()
  };

  loadFileString() {
    document.getElementById('fileUploader4')?.click()
  };

  loadFileText() {
    document.getElementById('fileUploader3')?.click()
  };


  loadFileArray() {
    document.getElementById('fileUploader1')?.click()
  }

  loadFileUrl() {
    document.getElementById('fileUploader2')?.click()
  }


  loadImageToNode() {

    const input = document.getElementById('fileUploader1');

    const ele: HTMLElement = input!;
    ele.onchange = (params: any) => {
      var reader: FileReader = new FileReader();
      var file: File = params.target.files[0];
      this.dataUplodService.uploadFilesToNode(file).subscribe((data: any) => {
        console.log(data);
        this.connection = true
      })
    }
    document.getElementById('fileUploader1')?.click();
  }


  uploadFileContectBuffer(evt: any) {
    this.performanceMonitor.arrayBufferPerComplete = false;
    this.performanceMonitor.uploadedArr = true;
    var start = window.performance.now();

    var reader: FileReader = new FileReader();
    var file: File = evt.target.files[0];
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      var end = window.performance.now();
      this.performanceMonitor.arrayBufferPerComplete = true;
      this.performanceMonitor.arrayBufferPer = end - start
    }
  };
  uploadFileContectUrl(evt: any) {
    var start = window.performance.now();
    this.performanceMonitor.urlPerComplete = false;
    this.performanceMonitor.uploadedurl = true;
    var reader: FileReader = new FileReader();
    var file: File = evt.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      var end = window.performance.now();
      this.performanceMonitor.urlPerComplete = true;
      this.performanceMonitor.urlPer = end - start
      console.log(`Execution time url: ${end - start} ms`);
    }
  };
  uploadFileContectText(evt: any) {
    var start = window.performance.now();
    this.performanceMonitor.textPerComplete = false;
    this.performanceMonitor.uploadedtext = true;
    var reader: FileReader = new FileReader();
    var file: File = evt.target.files[0];
    reader.readAsText(file);
    reader.onload = (e) => {
      var end = window.performance.now();
      this.performanceMonitor.textPerComplete = true;
      this.performanceMonitor.textPer = end - start
      console.log(`Execution time url: ${end - start} ms`);
    }
  };
  uploadFileContectBinar(evt: any) {
    var start = window.performance.now();
    this.performanceMonitor.stringPerComplete = false;
    this.performanceMonitor.uploadedstring = true;
    var reader: FileReader = new FileReader();
    var file: File = evt.target.files[0];
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      var end = window.performance.now();
      this.performanceMonitor.stringPerComplete = true;
      this.performanceMonitor.stringPer = end - start
      console.log(`Execution time url: ${end - start} ms`);
    }
  }
}
