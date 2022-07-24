import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsListComponent } from './elements-list.component';

describe('ElementsListComponent', () => {
  let component: ElementsListComponent;
  let fixture: ComponentFixture<ElementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
