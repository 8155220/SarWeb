import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionEditComponent } from './mision-edit.component';

describe('MisionEditComponent', () => {
  let component: MisionEditComponent;
  let fixture: ComponentFixture<MisionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
