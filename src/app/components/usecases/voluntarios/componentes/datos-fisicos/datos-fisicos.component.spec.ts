import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosFisicosComponent } from './datos-fisicos.component';

describe('DatosFisicosComponent', () => {
  let component: DatosFisicosComponent;
  let fixture: ComponentFixture<DatosFisicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosFisicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosFisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
