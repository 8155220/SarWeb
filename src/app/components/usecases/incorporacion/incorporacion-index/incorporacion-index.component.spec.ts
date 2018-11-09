import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporacionIndexComponent } from './incorporacion-index.component';

describe('IncorporacionIndexComponent', () => {
  let component: IncorporacionIndexComponent;
  let fixture: ComponentFixture<IncorporacionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorporacionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorporacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
