import {nativeScriptBootstrap} from "nativescript-angular/application";
import {HTTP_PROVIDERS} from "angular2/http";
import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {AppComponent} from "./app.component";

nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, NS_ROUTER_PROVIDERS]);
