import { Component, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

  
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('dateTime') sTime;
  newsletters = [];
  ref = firebase.database().ref('newsletters/');
  isLiked = false;
  lastKey = -1;
  likeManager = [{key : 0, value:false},
    {key : 1, value:false},
    {key : 2, value:false},
    {key : 3, value:false},
    {key : 4, value:false},
    {key : 5, value:false},
    {key : 6, value:false},
    {key : 7, value:false},
    {key : 8, value:false}
  ];
 
  constructor(public router: Router, public loadingController: LoadingController, private platform: Platform, private file: File, private ft: FileTransfer, 
    private fileOpener: FileOpener, private document: DocumentViewer, private toastController : ToastController, private emailComposer: EmailComposer) {
    this.ref.on('value', resp => {
      this.newsletters = [];
      this.newsletters = snapshotToArray(resp);
    });
  }

  openNewsletter(url){
    console.log("card content clicked.");
   //let filePath = this.file.applicationDirectory + 'www/assets/newsletters';
    //let url = this.file.applicationDirectory + 'www/assets/newsletters/AmazeEdition8.pdf';
    
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

  downloadNewsletter(pdfUrl){
    console.log("download button clicked.");
    //const url = 'https://firebasestorage.googleapis.com/v0/b/amaze-a3611.appspot.com/o/6.PNG?alt=media&token=98c1376c-99d3-4445-972b-78e48cecfbca';
    
    const fileTransfer: FileTransferObject = this.ft.create();
    
    fileTransfer.download(pdfUrl, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  

  fabFeedback(){
    console.log("Feedback Button Clicked!!");
    let email = {
      to: 'shubhi.puntambekar@zensar.com',
      cc: 'shubhi.puntambekar@zensar.com',
      subject: 'Feedback/Bug in Amaze Application',
      body: 'Feedbacks suggested/ Bugs found:',
      isHtml: true
    }
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        this.emailComposer.open(email);
      }
     });
  }

  

  updateLike(key){
    var templike;
    if(this.likeManager[key].value==false){
      if(!this.isLiked){
        this.ref.orderByKey().equalTo(key).on("child_added", function(snapshot) {
          var newLike = snapshot.val();
          templike = parseInt(newLike.likes) + 1;
          firebase.database().ref('newsletters/'+key).update({"likes" : templike});
        });
        this.likeManager[key].value=true;
      }    
    } else{
       this.presentToast();
    }
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have already liked the newsletter!',
      duration: 2000
    });
    toast.present();
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      //let item = { key: childSnapshot.key, value: childSnapshot.val() }
      returnArr.push(item);
  });

  return returnArr;
};