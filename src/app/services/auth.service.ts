import { inject, Injectable } from "@angular/core";
import { createClient, Session, SupabaseClient, User } from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { BehaviorSubject, firstValueFrom, from, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://flasksavingstracker.onrender.com/api";
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private router = inject(Router);
  constructor(private http: HttpClient) {
    // Replace with your actual Supabase URL and Anon Key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          // storage: new InMemoryStorage(),
          storage:window.sessionStorage,
          persistSession: true,
          autoRefreshToken:true,
          detectSessionInUrl:true
        },
      },
    );
  }

  isAuthenticated(): Observable<boolean> {
    return from(this.supabase.auth.getSession()).pipe(
      map((response) => {
        // Returns true if an active, unexpired session is found in localStorage
        return !!response.data.session;
      }),
    );
  }
  get user$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(emailValue: string, passwordValue: string) {
    const {data,error} = await this.supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });
    if (error) throw error;

    // 2. Send token securely to Flask backend via custom handler
    const payload = {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    };

    // Correct: Do NOT call .json() on the result of HttpClient
    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/login-handler`, payload, { withCredentials: true })
    );

    return response; // response is already a JavaScript object
  }
  get client(){return this.supabase;}
    // Custom handler to restore session on app refresh via Flask backend verification
  async restoreSessionOnRefresh(): Promise<Session | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ access_token: string; refresh_token: string }>(
          `${this.apiUrl}/refresh-session`,
          { withCredentials: true } // Sends secure HttpOnly cookie managed by Flask
        )
      );

      if (response?.access_token) {
        const { data, error } = await this.supabase.auth.setSession({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        });
        if (!error) return data.session;
      }
    } catch (err) {
      console.error('Session restore failed or expired', err);
    }
    return null;
  }
 
  

  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error during Supabase sign out:", error);
      localStorage.clear();
    } finally {
      try {
        await firstValueFrom(
          this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
        );
      } catch (error) {
        console.error("Error clearing backend session cookie:", error);
      }
      await this.router.navigate(["/login"]);
    }
  }

  // Forgot Password: Sends a reset link to the user's email
  async sendPasswordReset(email: string) {
    return await this.supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: "http://localhost:4200/update-password",
      redirectTo: "https://angularsavingstracker.vercel.app/update-password",
    });
  }

  // Update Password (Used on the redirection page)
  async updatePassword(newPass: string) {
    return await this.supabase.auth.updateUser({ password: newPass });
  }

  async getSessionToken(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.access_token || null;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }
  async getValidToken(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }
}
