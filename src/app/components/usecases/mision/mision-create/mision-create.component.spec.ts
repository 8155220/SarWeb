import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionCreateComponent } from './mision-create.component';

describe('MisionCreateComponent', () => {
  let component: MisionCreateComponent;
  let fixture: ComponentFixture<MisionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
