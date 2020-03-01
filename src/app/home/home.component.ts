import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sideNav') sideNav:MatSidenav;
  @ViewChild('aboutMe') aboutMe:ElementRef;
  @ViewChild('projects') projects:ElementRef;
  @ViewChild('technologies') technologies:ElementRef;
  @ViewChild('contact') contact:ElementRef;

  constructor() { }

  checkSideNav() {
    if(this.sideNav !== undefined){

      if(this.sideNav._width > 768){
        this.sideNav.close();
      }
    }
  }

  scrollToAboutMe(){
    this.aboutMe.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  scrollToProjects(){
    this.projects.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  scrollToTechnologies(){
    this.technologies.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  scrollToContact(){
    this.contact.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
