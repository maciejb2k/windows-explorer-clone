import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonTabToolsComponent } from './ribbon-tab-tools.component';

describe('RibbonTabToolsComponent', () => {
  let component: RibbonTabToolsComponent;
  let fixture: ComponentFixture<RibbonTabToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonTabToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonTabToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
