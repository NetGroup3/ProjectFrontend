import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditKitchenwareComponent } from './add-edit-kitchenware.component';

describe('AddEditKitchenwareComponent', () => {
  let component: AddEditKitchenwareComponent;
  let fixture: ComponentFixture<AddEditKitchenwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditKitchenwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditKitchenwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
