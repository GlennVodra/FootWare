import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeProductPageComponent } from './shoe-product-page.component';

describe('ShoeDetailComponent', () => {
  let component: ShoeProductPageComponent;
  let fixture: ComponentFixture<ShoeProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoeProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
