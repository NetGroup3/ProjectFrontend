import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDishComponent } from './user-dish.component';

describe('UserDishComponent', () => {
  let component: UserDishComponent;
  let fixture: ComponentFixture<UserDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
