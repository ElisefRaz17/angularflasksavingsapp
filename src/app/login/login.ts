import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
} from "@angular/core";
import { CustomInput } from "../shared/input/input";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CustomButton } from "../shared/button/button";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CustomInput, RouterLink, CustomButton, FormsModule,ReactiveFormsModule],
  templateUrl: "./login.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./login.css",
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  private authService = inject(AuthService);
  private emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(
        "",
        [Validators.required, Validators.pattern(this.emailRegex)],
      ),
      password: new FormControl("", [Validators.required]),
    });
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  async onSubmit() {
    this.authService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((response: any) => {
        if (response.error) {
          console.error("Authentication Error:", response.error.message);
        } else {
          this.router.navigate([""]);
          console.log("Login successful", response.data);
        }
      })
      .catch((err: any) => console.error("Request failed:", err));
  }
}
