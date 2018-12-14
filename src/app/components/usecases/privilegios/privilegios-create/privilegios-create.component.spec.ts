import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegiosCreateComponent } from './privilegios-create.component';

describe('PrivilegiosCreateComponent', () => {
  let component: PrivilegiosCreateComponent;
  let fixture: ComponentFixture<PrivilegiosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegiosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegiosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
