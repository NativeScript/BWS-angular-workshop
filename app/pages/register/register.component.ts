import {Component} from "angular2/core";

@Component({
  selector: "register",
  templateUrl: "pages/register/register.html"
})
export class RegisterPage {
  email: string = "email";
  password: string = "password";
  
  register() {
    alert("onRegister");
  }
}
