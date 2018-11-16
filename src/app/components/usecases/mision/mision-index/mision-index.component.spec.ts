import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionIndexComponent } from './mision-index.component';

describe('MisionIndexComponent', () => {
  let component: MisionIndexComponent;
  let fixture: ComponentFixture<MisionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
