import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { passwordMatchValidator } from "../utils/passwordValidator";
import { CustomInput } from "../shared/input/input";
import { CustomButton } from "../shared/button/button";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { ToastService } from "../services/toast";

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
export class UpdatePassword implements OnInit {
  updatePasswordForm!: FormGroup;
  private authService = inject(AuthService);
  private toastService = inject(ToastService)
  private router = inject(Router);
  private passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
    },{
      validators: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      // Set the mismatch error on the confirmPassword control specifically
      control.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }
  get password() {
    return this.updatePasswordForm.get("password");
  }
  get confirmPassword() {
    return this.updatePasswordForm.get("confirmPassword");
  }
  submitNewPassword() {
    this.authService.updatePassword(this.updatePasswordForm.value.password).then((response) => {
      this.toastService.show("Password is updated","success")
      this.router.navigate(["/login"]);
    }).catch((err)=>
    this.toastService.show(err,'error')
    );
  }
}
