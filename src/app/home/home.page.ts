import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('dateTime') sTime;
  newsletters = [];
  ref = firebase.database().ref('newsletters/');
  likes = 0;
  key = 0;
  constructor(public router: Router, public loadingController: LoadingController, private platform: Platform, private file: File, private ft: FileTransfer, 
    private fileOpener: FileOpener, private document: DocumentViewer) {
    this.ref.on('value', resp => {
      this.newsletters = [];
      this.newsletters = snapshotToArray(resp);
    });
  }

  openNewsletter(){
    console.log("card content clicked.");
    let filePath = this.file.applicationDirectory + 'www/assets/newsletters';
    let url = this.file.applicationDirectory + 'www/assets/newsletters/AmazeEdition8.pdf';
    window.open(url);
    // if (this.platform.is('android')) {
    //   let fakeName = Date.now();
    //   this.file.copyFile(filePath, 'AmazeEdition8.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
    //     this.fileOpener.open(result.nativeURL, 'application/pdf')
    //       .then(() => console.log('File is opened'))
    //       .catch(e => console.log('Error opening file', e));
    //   })
    // }else {
    //   // Use Document viewer for iOS for a better UI
    //   const options: DocumentViewerOptions = {
    //     title: 'My PDF'
    //   }
    //   this.document.viewDocument(`${filePath}/AmazeEdition8.pdf`, 'application/pdf', options);
    // }

  }

  downloadNewsletter(){
    console.log("download button clicked.");
    const url = 'https://firebasestorage.googleapis.com/v0/b/amaze-a3611.appspot.com/o/Amaze%20Edition%20-%208.pdf?alt=media&token=a733d494-fe8d-4fb0-bf12-f0cd7fdf9b9e';
    const fileTransfer: FileTransferObject = this.ft.create();
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  updateLike(key){
    //this.key = key;
    
    this.ref.on("child_added", function(snapshot, key) {
      var newPost = snapshot.val();
      console.log("Author: " + newPost.likes);
      console.log("Title: " + newPost.title);
      console.log("Previous Post ID: " + newPost.description);
    });
    
  }

  fabFeedback(){
    console.log("Feedback Button Clicked!!");
    
  }

  fabCalendar(){
    console.log("Monthly Button Clicked!!");
    this.sTime.open();
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};