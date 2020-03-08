import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostBinding,
  HostListener
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from "rxjs/operators";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  @ViewChild("aboutMe") aboutMe: ElementRef;
  @ViewChild("projects") projects: ElementRef;
  @ViewChild("technologies") technologies: ElementRef;
  @ViewChild("contact") contact: ElementRef;

  isVisible = false;
  currentActive: number;
  hiPadding: any;

  constructor() {}

  scrollToAboutMe() {
    this.aboutMe.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  scrollToProjects() {
    this.projects.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  scrollToTechnologies() {
    this.technologies.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  scrollToContact() {
    this.contact.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
