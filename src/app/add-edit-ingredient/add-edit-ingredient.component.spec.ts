import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIngredientComponent } from './add-edit-ingredient.component';

describe('AddEditIngredientComponent', () => {
  let component: AddEditIngredientComponent;
  let fixture: ComponentFixture<AddEditIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
