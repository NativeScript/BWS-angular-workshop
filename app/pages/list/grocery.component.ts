import {Component, Input, Output, EventEmitter} from "angular2/core";
import {Grocery} from "../../shared/grocery/grocery";

@Component({
  selector: "grocery-item",
  template: `      
  <GridLayout columns="*, auto">
    <Label [text]="grocery.name" class="medium-spacing"></Label>
    <Button text="X" (tap)="onDeleteTapped()" col="1" [isEnabled]="!isLoading" class="delete-button"></Button>
  </GridLayout>`,
})
export class GroceryItem {
  @Input() grocery: Grocery;
  @Input() isLoading: boolean;
  @Output() delete: EventEmitter<Grocery> = new EventEmitter<Grocery>();

  onDeleteTapped(grocery) {
    this.delete.emit(this.grocery);
  }
}
