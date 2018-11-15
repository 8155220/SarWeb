import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AscensoGradoComponent } from './ascenso-grado.component';

describe('AscensoGradoComponent', () => {
  let component: AscensoGradoComponent;
  let fixture: ComponentFixture<AscensoGradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AscensoGradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AscensoGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
