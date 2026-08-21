// auth-timer.service.ts
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthTimerService implements OnDestroy {
  private supabase: SupabaseClient;
  private activitySubscription?: Subscription;
  private readonly TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  constructor(private router: Router, private ngZone: NgZone) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  public startMonitoring(): void {
    this.stopMonitoring();

    // Run outside Angular zone to prevent excessive change detection on mouse/scroll events
    this.ngZone.runOutsideAngular(() => {
      const userActivityEvents$ = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'mousedown'),
        fromEvent(window, 'keydown'),
        fromEvent(window, 'scroll'),
        fromEvent(window, 'touchstart')
      );

      this.activitySubscription = userActivityEvents$
        .pipe(
          switchMap(() => timer(this.TIMEOUT_MS))
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.handleTimeout();
          });
        });
    });
  }

  public stopMonitoring(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

  private async handleTimeout(): Promise<void> {
    this.stopMonitoring();
    
    // Sign out from Supabase (clears local session & tokens)
    await this.supabase.auth.signOut();
    
    // Redirect to login with reason
    this.router.navigate(['/login'], { 
      queryParams: { sessionExpired: 'true' } 
    });
  }

  ngOnDestroy(): void {
    this.stopMonitoring();
  }
}
