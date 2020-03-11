import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostBinding,
  HostListener,
  ViewChildren,
  QueryList
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { fromEvent, Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
  switchMap
} from "rxjs/operators";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { RouterOutlet, Router, ActivatedRoute } from "@angular/router";

enum Direction {
  Up = "Up",
  Down = "Down"
}

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  animations: [
    trigger("toggle", [
      state("hidden", style({ opacity: 0, transform: "translateY(-100%)" })),
      state("visible", style({ opacity: 1, transform: "translateY(0)" })),
      transition("* => *", animate("200ms ease-in"))
    ])
  ]
})
export class BlogComponent implements OnInit, AfterViewInit {
  @ViewChild("sideNav") sideNav: MatSidenav;
  @ViewChildren("entry") entries: QueryList<ElementRef>;
  isVisible = true;
  sessionEntry: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sessionEntry = this.route.queryParamMap.pipe(
      map(params => params.get("entry") || "None")
    );
  }
  ngAfterViewInit() {
    const scroll$ = fromEvent(window, "scroll").pipe(
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
    this.sessionEntry.subscribe(value => this.smoothScrollToElement(value));
  }

  checkSideNav() {
    if (this.sideNav !== undefined) {
      if (this.sideNav._width > 768) {
        this.sideNav.close();
      }
    }
  }

  // @HostListener('window:scroll')
  // checkOffsetTop() {
  //   if (window.pageYOffset >= this.aboutMe.nativeElement.offsetTop &&
  //     window.pageYOffset < this.projects.nativeElement.offsetTop) {
  //     this.currentActive = 1;
  //   } else if (window.pageYOffset >= this.projects.nativeElement.offsetTop
  //      && window.pageYOffset < this.technologies.nativeElement.offsetTop) {
  //     this.currentActive = 2;
  //   } else if (window.pageYOffset >= this.technologies.nativeElement.offsetTop
  //     && window.pageYOffset < this.contact.nativeElement.offsetTop) {
  //     this.currentActive = 3;
  //   } else if (window.pageYOffset >= this.contact.nativeElement.offsetTop) {
  //     this.currentActive = 4;
  //   } else {
  //     this.currentActive = 0;
  //   }
  // }

  navToHome() {
    this.router.navigateByUrl("");
  }

  smoothScrollToElement(elementId: string) {
    for (let entry of this.entries) {
      if (entry.nativeElement.id === elementId) {
        entry.nativeElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        return;
      }
    }
  }
}
