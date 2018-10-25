import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpassComponent } from './editpass.component';

describe('EditpassComponent', () => {
  let component: EditpassComponent;
  let fixture: ComponentFixture<EditpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
