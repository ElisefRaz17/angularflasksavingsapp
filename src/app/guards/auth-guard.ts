// src/app/guards/auth.guard.ts
import { inject, Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true; // Session loaded and valid; let the user stay on the page
      } else {
        // No session found; redirect to login
        return router.createUrlTree(['/login']); 
      }
    })
  );
};
