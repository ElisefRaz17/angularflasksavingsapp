import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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
  password = "";
  confirmPassword = "";
  constructor(private http: HttpClient) {}
  isValid() {
    return this.password.length >= 8 && this.password === this.confirmPassword;
  }
  
  submitNewPassword() {
    const token = localStorage.getItem("supabase_token")
    this.http
      .post(
        "https://flasksavingstracker.onrender.com/api/update-password",
        {
          password: this.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .subscribe({
        next: () => alert("Password updated!"),
        error: (err) => console.log(err),
      });
  }
}
