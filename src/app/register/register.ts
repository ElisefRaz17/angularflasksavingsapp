import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Router, RouterLink } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CustomInput,
    CustomButton,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  private userService = inject(UserService);
  private emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
  private passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  isMobile$ = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(map((result) => result.matches));
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {}
  users: User[] = [];

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
      full_name: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern)
      ]),
    });
  }
  get password() {
    return this.registerForm.get("password");
  }
  get full_name() {
    return this.registerForm.get("full_name");
  }
  get email() {
    return this.registerForm.get("email");
  }

  addUser() {
    this.userService
      .createUser({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        full_name: this.registerForm.value.full_name,
      })
      .subscribe((response) => {
        if (response) {
          this.router.navigate(["/login"]);
        }
      });
  }
}
