import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistShoeComponent } from './wishlist-shoe.component';

describe('WishlistShoeComponent', () => {
  let component: WishlistShoeComponent;
  let fixture: ComponentFixture<WishlistShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistShoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
