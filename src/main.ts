import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from "@angular/platform-browser";
import { APP_INITIALIZER, Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Navbar } from "./app/navbar/navbar";
import { NavigationEnd, provideRouter, Router, RouterLink, RouterOutlet } from "@angular/router";
import { AppRoutingModule, routes } from "./app/app-routing.module";
import { filter } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { ToastContainer } from "./app/toast-container/toast-container";
import { provideHttpClient, withXhr, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./app/interceptors/auth.interceptor";
import { AuthTimerService } from "./app/services/auth-timer.service";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "./environments/environment";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [Navbar, CommonModule, RouterOutlet, AppRoutingModule, ToastContainer],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <main>
      <!-- <a [routerLink]="['/']"> -->
        <app-navbar *ngIf="showNavbar"></app-navbar>
      <!-- </a> -->
      <section class="content">
        <router-outlet></router-outlet>
        <app-toast-container></app-toast-container>
      </section>
    </main>
  `,
})
export class App implements OnInit {
  private supabase: SupabaseClient;
  showNavbar = true;
  hiddenPaths = ['/login', '/register','/reset-password','/update-password','/reset-email'];
  constructor(private router: Router, private authTimer:AuthTimerService) {
    this.supabase = createClient(environment.supabaseUrl,environment.supabaseKey)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // List routes where navbar should be hidden
      this.showNavbar = !this.hiddenPaths.some(path=>event.urlAfterRedirects.startsWith(path));
    });
  }
  ngOnInit():void{
    this.supabase.auth.onAuthStateChange((event,session)=>{
      if(session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')){
        this.authTimer.startMonitoring()
      }else if(event === 'SIGNED_OUT'){
        this.authTimer.stopMonitoring();
      }
    })
  }
}


bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptors([authInterceptor])),
  ],
}).catch((err)=>console.error(err));
