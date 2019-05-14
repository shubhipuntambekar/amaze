import { Component, ViewChild } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('dateTime') sTime;
  newsletters = [];
  ref = firebase.database().ref('newsletters/');
  constructor(public router: Router, public loadingController: LoadingController, private transfer: FileTransfer, private file: File) {
    this.ref.on('value', resp => {
      this.newsletters = [];
      this.newsletters = snapshotToArray(resp);
    });
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
  downloadEdition8(){
    console.log("download started..");
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