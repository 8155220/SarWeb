import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadDetailComponent } from './especialidad-detail.component';

describe('EspecialidadDetailComponent', () => {
  let component: EspecialidadDetailComponent;
  let fixture: ComponentFixture<EspecialidadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
