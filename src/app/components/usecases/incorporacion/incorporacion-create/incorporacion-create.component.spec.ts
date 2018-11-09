import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporacionCreateComponent } from './incorporacion-create.component';

describe('IncorporacionCreateComponent', () => {
  let component: IncorporacionCreateComponent;
  let fixture: ComponentFixture<IncorporacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorporacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorporacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
