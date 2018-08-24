import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioDeleteComponent } from './voluntario-delete.component';

describe('VoluntarioDeleteComponent', () => {
  let component: VoluntarioDeleteComponent;
  let fixture: ComponentFixture<VoluntarioDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
