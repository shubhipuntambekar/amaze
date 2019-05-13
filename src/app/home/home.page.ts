import { Component, ViewChild } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
//import { url } from 'inspector';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  @ViewChild('dateTime') sTime;
  
  constructor(private transfer: FileTransfer, private file: File) {
    
  }
  download() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/amaze-a3611.appspot.com/o/Amaze%20Edition%20-%208.pdf?alt=media&token=a733d494-fe8d-4fb0-bf12-f0cd7fdf9b9e';
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }
  
  fabFeedback(){
    console.log("Feedback Button Clicked!!");
    
  }
  fabCalendar(){
    console.log("Monthly Button Clicked!!");
    this.sTime.open();
  }
  edition9(){
    console.log("Card 9 clicked");
    
  }
  downloadEdition8(){
    //let url="";
    console.log("download started..");
    
    this.download();
    //console.log("Downloaded.");
  }
}
