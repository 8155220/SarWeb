import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritoCreateComponent } from './merito-create.component';

describe('MeritoCreateComponent', () => {
  let component: MeritoCreateComponent;
  let fixture: ComponentFixture<MeritoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
