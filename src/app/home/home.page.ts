import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('dateTime') sTime;
  fabFeedback(){
    console.log("Feedback Button Clicked!!");
    
  }
  fabCalendar(){
    console.log("Monthly Button Clicked!!");
    this.sTime.open();
  }
}
