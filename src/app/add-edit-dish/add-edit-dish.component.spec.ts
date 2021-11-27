import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDishComponent } from './add-edit-dish.component';

describe('AddEditDishComponent', () => {
  let component: AddEditDishComponent;
  let fixture: ComponentFixture<AddEditDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
