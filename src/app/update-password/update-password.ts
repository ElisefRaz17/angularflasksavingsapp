import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { passwordMatchValidator } from "../utils/passwordValidator";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-update-password",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomInput,
    CustomButton,
  ],
  templateUrl: "./update-password.html",
  styleUrl: "./update-password.css",
})
export class UpdatePassword {
  private authService = inject(AuthService);
  private router = inject(Router);
  password = "";
  confirmPassword = "";
  constructor(private http: HttpClient) {}
  isValid() {
    return this.password.length >= 8 && this.password === this.confirmPassword;
  }

  submitNewPassword() {
    this.authService.updatePassword(this.password).then((response) => {
      alert("Password updated");
      this.router.navigate(["/login"]);
    });
  }
}
