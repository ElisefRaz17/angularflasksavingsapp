import { inject, Injectable } from "@angular/core";
import {
  createClient,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { BehaviorSubject, from, map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private router = inject(Router)
  constructor() {
    // Replace with your actual Supabase URL and Anon Key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  }

  isAuthenticated(): Observable<boolean> {
    return from(this.supabase.auth.getSession()).pipe(
      map((response) => {
        // Returns true if an active, unexpired session is found in localStorage
        return !!response.data.session; 
      })
    );
  }
  get user$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(emailValue: string, passwordValue: string) {
    return await this.supabase.auth.signInWithPassword({ email:emailValue, password:passwordValue });
  }

  async signOut():Promise<void> {
    try{
      const {error} = await this.supabase.auth.signOut();
      if(error) throw error;
    }catch(error){
      console.error('Error during Supabase sign out:',error);
      localStorage.clear()
    }finally{
      await this.router.navigate(['/login'])
    }
    
  }

  // Forgot Password: Sends a reset link to the user's email
  async sendPasswordReset(email: string) {
    return await this.supabase.auth.resetPasswordForEmail(email, {
      // redirectTo: "http://localhost:4200/update-password",
      redirectTo:"https://angularsavingstracker.vercel.app/update-password"

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
