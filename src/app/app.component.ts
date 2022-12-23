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

  // Initialize variable
  username: string = '';
  email: string = '';
  is_login = true;
  is_register = false;

  // Variable for login
  login_email: string = '';
  login_password: string = '';
  login_error: string = '';

  // Variable for register
  register_username: string = '';
  register_email: string = '';
  register_password: string = '';
  register_re_password: string = '';
  register_error: string = '';

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.email = await this.storage.get('email');
  }

  showLogin() {
    this.is_register = false;
    this.is_login = true;
    this.login_error = '';
    this.register_error = '';
  }

  showRegister() {
    this.is_login = false;
    this.is_register = true;
    this.login_error = '';
    this.register_error = '';
  }

  // Login Function
  login() {
    this.us
      .checkUser(this.login_email, this.login_password)
      .subscribe((data) => {
        console.log(data);
        if (data['result'] == 'success') {
          // Redirect to home
          this.email = this.login_email;
          this.username = data['username'];
          this.router.navigate(['/home']);
        } else {
          this.login_error = data['message'];
        }
      });
  }
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
            this.email = this.register_email;
            this.username = this.register_username;
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

  // Logout function
  async logout() {
    this.email = '';
    this.username = '';

    // Reset Variable
    this.username = '';
    this.login_email = '';
    this.login_password = '';
    this.login_error = '';
    this.register_username = '';
    this.register_email = '';
    this.register_password = '';
    this.register_re_password = '';
    this.register_error = '';
  }

  // Converting datetime
  last_update = (latest_update: string | number | Date) => {
    let difference =
      ((Number(new Date()) - Number(new Date(latest_update))) / 1000) | 0;
    let timePassed = `${difference} seconds ago`;

    if (difference >= 60) {
      difference /= 60;
      timePassed = `${difference | 0} minutes ago`;

      if (difference >= 60) {
        difference /= 60;
        timePassed = `${difference | 0} hours ago`;

        if (difference >= 24) {
          difference /= 24;
          timePassed = `${difference | 0} days ago`;

          if (difference >= 30) {
            difference /= 30;
            timePassed = `${difference | 0} months ago`;

            if (difference >= 365) {
              difference /= 365;
              timePassed = `${difference | 0} years ago`;
            }
          }
        }
      }
    }

    // Assign value
    return timePassed;
  };
}
