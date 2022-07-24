import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonTabViewComponent } from './ribbon-tab-view.component';

describe('RibbonTabViewComponent', () => {
  let component: RibbonTabViewComponent;
  let fixture: ComponentFixture<RibbonTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonTabViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
