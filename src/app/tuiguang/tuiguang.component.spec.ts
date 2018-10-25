import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuiguangComponent } from './tuiguang.component';

describe('TuiguangComponent', () => {
  let component: TuiguangComponent;
  let fixture: ComponentFixture<TuiguangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuiguangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuiguangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
