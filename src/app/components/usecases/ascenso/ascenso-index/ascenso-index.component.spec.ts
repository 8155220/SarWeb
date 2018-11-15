import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AscensoIndexComponent } from './ascenso-index.component';

describe('AscensoIndexComponent', () => {
  let component: AscensoIndexComponent;
  let fixture: ComponentFixture<AscensoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AscensoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AscensoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
