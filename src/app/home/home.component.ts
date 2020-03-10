import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  Validators,
  NgForm,
  FormBuilder
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { trigger, style, transition, animate } from "@angular/animations";
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
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate(1500, style({ opacity: 1 }))
      ])
    ])
  ]
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
    // this.setVhToWindowHeight();

    this.contactForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      message: ["", Validators.required]
    });

    this.emailFormControl = this.contactForm.controls["email"];
    this.nameFormControl = this.contactForm.controls["name"];
    this.messageFormControl = this.contactForm.controls["message"];
  }

  // @HostListener("window:resize")
  // setVhToWindowHeight() {
  //   // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  //   let vh = window.innerHeight * 0.01;
  //   // Then we set the value in the --vh custom property to the root of the document
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }

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
