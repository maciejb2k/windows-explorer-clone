import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisPCComponent } from './this-pc.component';

describe('ThisPCComponent', () => {
  let component: ThisPCComponent;
  let fixture: ComponentFixture<ThisPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
