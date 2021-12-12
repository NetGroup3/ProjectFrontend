import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddStock: boolean = false;
  // private showRecommendDish: boolean = false;
  private subject = new Subject<boolean>();
  constructor() { }

  toggleAddStock(): void{
    this.showAddStock = !this.showAddStock;
    this.subject.next(this.showAddStock);
  }

/*  toggleRecommendDish() {
    this.showRecommendDish =!this.showRecommendDish;
    this.subject.next(this.showRecommendDish);
    return this.subject.asObservable();
  }*/

  onShowAddStock(): Observable<boolean> {
    return this.subject.asObservable();
  }

/*  onRecommendDish(): Observable<boolean> {
    return this.subject.asObservable();
  }*/



}
