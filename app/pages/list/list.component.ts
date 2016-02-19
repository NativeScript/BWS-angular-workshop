import {Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef} from "angular2/core";
import {OnActivate} from "angular2/router";
import * as dialogsModule from "ui/dialogs";
import {TextField} from "ui/text-field";
import {ActionItem} from "ui/action-bar";
import {Page} from "ui";

import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";

import {GroceryItem} from "./grocery.component";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  providers: [GroceryListService],
  directives: [GroceryItem]
})
export class ListPage implements OnInit, OnActivate {
  grocery: string;
  isLoading: boolean;
  items: Array<Grocery>;
  @ViewChild("groceryText") groceryText: ElementRef;

  constructor(
    private _groceryListService: GroceryListService) {

    this.grocery = "";
    this.isLoading = true;
  }

  ngOnInit() {
    this._groceryListService.load()
      .subscribe(groceryList => {
        this.items = groceryList;
        this.isLoading = false;
      });
  }

  routerOnActivate(nextInstruction, prevInstruction) {
    var shareItem = new ActionItem();
    shareItem.text = "SHARE";
    shareItem.on("tap", () => this.share());
    
    if (shareItem.ios) {
      shareItem.ios.position = "right";
    }
    
    var page = <Page>this.groceryText.nativeElement.page;
    page.actionBar.actionItems.addItem(shareItem);
  }

  add() {
    // Check for empty submissions
    if (this.grocery.trim() === "") {
      dialogsModule.alert({
        message: "Enter a grocery item",
        okButtonText: "OK"
      });
      return;
    }
    
    // Dismiss the keyboard
    let groceryTextField = <TextField>this.groceryText.nativeElement;
    groceryTextField.dismissSoftInput();

    this.isLoading = true;
    this._groceryListService.add(this.grocery)
      .subscribe(
      groceryObject => {
        this.items.push(groceryObject);
        this.grocery = "";
        this.isLoading = false;

      },
      () => {
        dialogsModule.alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
        this.isLoading = false;
      })
  }

  delete(grocery) {
    this.isLoading = true;
    this._groceryListService.delete(grocery.id)
      .subscribe(() => {
        var index = this.items.indexOf(grocery);
        this.items.splice(index, 1);
        this.isLoading = false;
      });
  }

  share() {
    // Lazy load the socialShare module 
    // as it fails it it is loaded before there is an application context in Android.
    let socialShare: { shareText: (text: string) => void } = require("nativescript-social-share");
    let listString = this.items.map(item => item.name).join(", ");
    socialShare.shareText(listString);
  };
}
