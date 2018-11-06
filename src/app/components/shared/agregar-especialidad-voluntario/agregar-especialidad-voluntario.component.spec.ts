import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEspecialidadVoluntarioComponent } from './agregar-especialidad-voluntario.component';

describe('AgregarEspecialidadVoluntarioComponent', () => {
  let component: AgregarEspecialidadVoluntarioComponent;
  let fixture: ComponentFixture<AgregarEspecialidadVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEspecialidadVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEspecialidadVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
