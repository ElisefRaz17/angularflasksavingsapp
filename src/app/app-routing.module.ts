import { RouterModule, Routes } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { Home } from "./home/home";
import { authGuard } from "./guards/auth-guard";
import { NgModule } from "@angular/core";
import { ResetPassword } from "./reset-password/reset-password";
import { UpdatePassword } from "./update-password/update-password";
import { ResetEmail } from "./reset-email/reset-email";
import { MonthlyDeposits } from "./monthly-deposits/monthly-deposits";
import { EditDetails } from "./edit-details/edit-details";

export const routes: Routes = [
  { path: "login", component: Login, title: "Login" },

  { path: "register", component: Register, title: "Sign Up" },
  { path: "reset-password", component: ResetPassword, title: "Reset Password" },
  { path: "reset-email", component: ResetEmail, title: "Reset Email" },

  {
    path: "update-password",
    component: UpdatePassword,
    title: "Update Password",
  },

  { path: "goal-details/:id", component: EditDetails, title: "Edit Goal Details" ,

    canActivate: [authGuard],

  },
  {
    path: "",
    component: Home,
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  // { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
