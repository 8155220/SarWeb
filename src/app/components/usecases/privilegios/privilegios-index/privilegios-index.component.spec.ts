import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegiosIndexComponent } from './privilegios-index.component';

describe('PrivilegiosIndexComponent', () => {
  let component: PrivilegiosIndexComponent;
  let fixture: ComponentFixture<PrivilegiosIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegiosIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegiosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
