import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngridientsComponent } from './ingridients.component';

describe('IngridientsComponent', () => {
  let component: IngridientsComponent;
  let fixture: ComponentFixture<IngridientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngridientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngridientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
