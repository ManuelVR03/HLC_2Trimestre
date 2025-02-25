import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user$ = new BehaviorSubject<User | null>(null);

    constructor(private auth: Auth, private router: Router) {
        onAuthStateChanged(this.auth, (user) => {
            this.user$.next(user);
        });
    }

    async login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/home']);
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.router.navigate(['/login']);
    }

    getUser() {
        return this.user$.asObservable();
    }
}