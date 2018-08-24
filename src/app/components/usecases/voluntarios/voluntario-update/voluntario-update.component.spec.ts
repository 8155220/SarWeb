import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioUpdateComponent } from './voluntario-update.component';

describe('VoluntarioUpdateComponent', () => {
  let component: VoluntarioUpdateComponent;
  let fixture: ComponentFixture<VoluntarioUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
