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
import {
  FormControl,
  FormGroupDirective,
  Validators,
  NgForm,
  FormBuilder
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("aboutMe") aboutMe: ElementRef;
  @ViewChild("projects") projects: ElementRef;
  @ViewChild("technologies") technologies: ElementRef;
  @ViewChild("contact") contact: ElementRef;

  isVisible = false;
  currentActive: number;
  hiPadding: any;

  matcher = new MyErrorStateMatcher();
  contactForm: any;
  emailFormControl: any;
  nameFormControl: any;
  messageFormControl: any;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      message: ["", Validators.required]
    });

    this.emailFormControl = this.contactForm.controls["email"];
    this.nameFormControl = this.contactForm.controls["name"];
    this.messageFormControl = this.contactForm.controls["message"];
  }
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

  submitForm() {
    console.log(this.emailFormControl.value);
    console.log(this.nameFormControl.value);
    console.log(this.messageFormControl.value);
    this.formSubmitted = true;
  }
}
