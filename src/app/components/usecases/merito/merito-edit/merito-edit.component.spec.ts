import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritoEditComponent } from './merito-edit.component';

describe('MeritoEditComponent', () => {
  let component: MeritoEditComponent;
  let fixture: ComponentFixture<MeritoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
