import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchOrderComponent } from './watch-order.component';

describe('WatchOrderComponent', () => {
  let component: WatchOrderComponent;
  let fixture: ComponentFixture<WatchOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
