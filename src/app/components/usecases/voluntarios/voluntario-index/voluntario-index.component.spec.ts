import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioIndexComponent } from './voluntario-index.component';

describe('VoluntarioIndexComponent', () => {
  let component: VoluntarioIndexComponent;
  let fixture: ComponentFixture<VoluntarioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
