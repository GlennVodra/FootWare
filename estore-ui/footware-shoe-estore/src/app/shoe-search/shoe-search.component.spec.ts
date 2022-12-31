import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeSearchComponent } from './shoe-search.component';

describe('ShoeSearchComponent', () => {
  let component: ShoeSearchComponent;
  let fixture: ComponentFixture<ShoeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
