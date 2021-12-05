import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKitchenwareComponent } from './list-kitchenware.component';

describe('ListKitchenwareComponent', () => {
  let component: ListKitchenwareComponent;
  let fixture: ComponentFixture<ListKitchenwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKitchenwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKitchenwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
