import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritoIndexComponent } from './merito-index.component';

describe('MeritoIndexComponent', () => {
  let component: MeritoIndexComponent;
  let fixture: ComponentFixture<MeritoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
