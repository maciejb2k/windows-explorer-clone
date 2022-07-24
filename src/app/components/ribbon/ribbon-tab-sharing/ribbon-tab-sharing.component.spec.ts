import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonTabSharingComponent } from './ribbon-tab-sharing.component';

describe('RibbonTabSharingComponent', () => {
  let component: RibbonTabSharingComponent;
  let fixture: ComponentFixture<RibbonTabSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonTabSharingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonTabSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
