import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";

@Component({
  selector: "login",
  templateUrl: "pages/login/login.html",
  providers: [UserService],
  directives: [NS_ROUTER_DIRECTIVES]
})
export class LoginPage {
  user: User;

  constructor(
    private _router: Router,
    private _userService: UserService) {

    this.user = new User();

    // Hardcode a few values to make testing easy
    this.user.email = "nativescriptrocks@telerik.com";
    this.user.password = "password";
  }

  signIn() {
    this._userService.login(this.user)
      .subscribe(
      () => this._router.navigate(["List"]),
      (error) => {
        console.log(error);
        alert("Login error");
      }
      );
  }
}
