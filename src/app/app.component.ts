import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'; 

const config={
  apiKey: "AIzaSyC86QM4q9EuZcUqb_5_sSMSb7raZpDKhQE",
    authDomain: "amaze-a3611.firebaseapp.com",
    databaseURL: "https://amaze-a3611.firebaseio.com",
    projectId: "amaze-a3611",
    storageBucket: "amaze-a3611.appspot.com",
    messagingSenderId: "505924297609",
    appId: "1:505924297609:web:143014d41f7c5b89"
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
