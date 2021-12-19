import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddStock: boolean = false;
  private subject = new Subject<boolean>();

  toggleAddStock(): void{
    this.showAddStock = !this.showAddStock;
    this.subject.next(this.showAddStock);
  }

  onShowAddStock(): Observable<boolean> {
    return this.subject.asObservable();
  }

}
