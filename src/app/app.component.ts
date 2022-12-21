import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public us: UserService,
    private storage: Storage,
    private router: Router
  ) {}

  // Variable for login
  login_email: string = '';
  login_password: string = '';
  login_error: string = '';

  // Login Function
  login() {
    this.us
      .checkUser(this.login_email, this.login_password)
      .subscribe((data) => {
        if (data['result'] == 'success') {
          // Redirect to home
          this.storage.set('email', this.register_email);
          this.storage.set('username', data['username']);
          this.router.navigate(['/home']);
        } else {
          this.login_error = data['message'];
        }
      });
  }

  // Variable for login
  register_username: string = '';
  register_email: string = '';
  register_password: string = '';
  register_re_password: string = '';
  register_error: string = '';

  // Register function
  register() {
    if (this.register_password == this.register_re_password) {
      this.us
        .addUser(
          this.register_username,
          this.register_email,
          this.register_password
        )
        .subscribe((data) => {
          if (data['result'] == 'success') {
            // Redirect to home
            this.storage.set('email', this.register_email);
            this.storage.set('username', data['username']);
            this.router.navigate(['/home']);
          } else {
            this.register_error = data['message'];
          }
        });
    }
    // Password not the same
    else {
      this.register_error = 'Password does not match!';
    }
  }
}
