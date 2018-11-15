import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AscensoVoluntarioComponent } from './ascenso-voluntario.component';

describe('AscensoVoluntarioComponent', () => {
  let component: AscensoVoluntarioComponent;
  let fixture: ComponentFixture<AscensoVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AscensoVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AscensoVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
