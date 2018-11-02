import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadIndexComponent } from './especialidad-index.component';

describe('EspecialidadIndexComponent', () => {
  let component: EspecialidadIndexComponent;
  let fixture: ComponentFixture<EspecialidadIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
