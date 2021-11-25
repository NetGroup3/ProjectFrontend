import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenwareComponent } from './kitchenware.component';

describe('KitchenwareComponent', () => {
  let component: KitchenwareComponent;
  let fixture: ComponentFixture<KitchenwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
