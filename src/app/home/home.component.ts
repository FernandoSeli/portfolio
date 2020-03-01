import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        'visible',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
  ])],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sideNav') sideNav:MatSidenav;
  @ViewChild('aboutMe') aboutMe:ElementRef;
  @ViewChild('projects') projects:ElementRef;
  @ViewChild('technologies') technologies:ElementRef;
  @ViewChild('contact') contact:ElementRef;

  isVisible = false;
  currentActive: number;

  constructor() { }

  ngAfterViewInit() {
    this.isVisible = false;

    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));

  }

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

  @HostListener('window:scroll')
  checkOffsetTop() {
    if (window.pageYOffset >= this.aboutMe.nativeElement.offsetTop &&
      window.pageYOffset < this.projects.nativeElement.offsetTop) {
      this.currentActive = 1;
    } else if (window.pageYOffset >= this.projects.nativeElement.offsetTop
       && window.pageYOffset < this.technologies.nativeElement.offsetTop) {
      this.currentActive = 2;
    } else if (window.pageYOffset >= this.technologies.nativeElement.offsetTop
      && window.pageYOffset < this.contact.nativeElement.offsetTop) {
      this.currentActive = 3;
    } else if (window.pageYOffset >= this.contact.nativeElement.offsetTop) {
      this.currentActive = 4;
    } else {
      this.currentActive = 0;
    }

    if(window.pageYOffset <= this.aboutMe.nativeElement.offsetTop - 100){
      this.isVisible = false;
    }
  }
}
