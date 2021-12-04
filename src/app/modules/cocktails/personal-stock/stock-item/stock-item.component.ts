import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StockModel} from "../../../models/stock.model";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
  selected: boolean = true;

  @Input() stock!: StockModel;
  @Output() onDeleteStock: EventEmitter<StockModel> = new EventEmitter<StockModel>()
  @Output() onChangeStock: EventEmitter<StockModel> = new EventEmitter<StockModel>()
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(stock: StockModel) {
    this.onDeleteStock.emit(stock);
  }

  onChange(stock: StockModel) {
    this.selected = !this.selected
    if(!this.selected){
      return;
    }
    this.onChangeStock.emit(stock);
  }
}
