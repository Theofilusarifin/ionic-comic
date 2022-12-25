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
    if (this.login_email != '' && this.login_password != '') {
      this.us
        .checkUser(this.login_email, this.login_password)
        .subscribe((data) => {
          if (data['result'] == 'success') {
            // Redirect to home
            this.email = this.login_email;
            this.storage.set('email', this.login_email);
            this.username = data['username'];
            this.storage.set('username', data['username']);
            this.router.navigate(['/home']);
          } else {
            this.login_error = data['message'];
          }
        });
    } else {
      this.login_error = 'This credential does not match our records!';
    }
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
            this.storage.set('email', this.register_email);
            this.username = this.register_username;
            this.storage.set('username', this.register_username);
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
  last_update = (date: string | number | Date) => {
    var today = new Date();
    var input_date = new Date(date)
    var comic_date = new Date(input_date.setHours(input_date.getHours() + 7));

    var diffyear = today.getFullYear() - comic_date.getFullYear();
    if (diffyear > 0) return diffyear + ' years ago';

    var diffmonth = today.getMonth() - comic_date.getMonth();
    if (diffmonth > 0) return diffmonth + ' months ago';

    var diffday = today.getDate() - comic_date.getDate();
    if (diffday > 0) return diffday + ' days ago';

    var diffhour = today.getHours() - comic_date.getHours();
    if (diffhour > 0) return diffhour + ' hours ago';

    var diffmin = today.getMinutes() - comic_date.getMinutes();
    if (diffmin > 0) return diffmin + ' minutes ago';

    var diffsec = today.getSeconds() - comic_date.getSeconds();
    if (diffsec > 0) return diffsec + ' seconds ago';

    return 'Just released';
  };
}
