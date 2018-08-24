import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioCreateComponent } from './voluntario-create.component';

describe('VoluntarioCreateComponent', () => {
  let component: VoluntarioCreateComponent;
  let fixture: ComponentFixture<VoluntarioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
