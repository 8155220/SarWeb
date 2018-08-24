import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioCardComponent } from './voluntario-card.component';

describe('VoluntarioCardComponent', () => {
  let component: VoluntarioCardComponent;
  let fixture: ComponentFixture<VoluntarioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
