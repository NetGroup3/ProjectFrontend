import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Stock} from "../../../core/models/stock";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  selected: boolean = true;

  @Input() stock!: Stock;
  @Output() onDeleteStock: EventEmitter<Stock> = new EventEmitter<Stock>()
  @Output() onChangeStock: EventEmitter<Stock> = new EventEmitter<Stock>()
  faTimes = faTimes;

  onDelete(stock: Stock) {
    this.onDeleteStock.emit(stock);
  }

  onChange(stock: Stock) {
    this.selected = !this.selected
    if(!this.selected){
      return;
    }
    this.onChangeStock.emit(stock);
  }
}
