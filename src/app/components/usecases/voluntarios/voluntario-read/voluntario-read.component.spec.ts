import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioReadComponent } from './voluntario-read.component';

describe('VoluntarioReadComponent', () => {
  let component: VoluntarioReadComponent;
  let fixture: ComponentFixture<VoluntarioReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
