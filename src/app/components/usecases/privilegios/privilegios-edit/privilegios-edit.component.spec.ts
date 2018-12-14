import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegiosEditComponent } from './privilegios-edit.component';

describe('PrivilegiosEditComponent', () => {
  let component: PrivilegiosEditComponent;
  let fixture: ComponentFixture<PrivilegiosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegiosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegiosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
