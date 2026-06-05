import { Component, inject } from "@angular/core";
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
} from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CustomInput, RouterLink,CustomButton, FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  private authService = inject(AuthService);
  email = '';
  password = '';
  onEmailChange(event: any) {
    // If event is a string, it assigns correctly. If it is an InputEvent object, it falls back to event.target.value
    this.email= typeof event === 'string' ? event : event.target?.value;
  }
  onPasswordChange(event: any) {
    // If event is a string, it assigns correctly. If it is an InputEvent object, it falls back to event.target.value
    this.password= typeof event === 'string' ? event : event.target?.value;
  }
  // private fb = inject(FormBuilder);
  // private emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$';

  constructor(private router: Router) {}
  // loginForm: FormGroup = this.fb.group({
  //   email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
  //   password: ["", Validators.required],
  // });
  
  async onSubmit() {
      this.authService.signIn(this.email, this.password).then((response: any) => {
        if (response.error) {
          console.error('Authentication Error:', response.error.message);
        } else {
          this.router.navigate([''])
          console.log('Login successful', response.data);
        }
      }).catch((err: any) => console.error('Request failed:', err));
    }
}
