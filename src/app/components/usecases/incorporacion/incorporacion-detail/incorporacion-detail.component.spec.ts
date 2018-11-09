import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporacionDetailComponent } from './incorporacion-detail.component';

describe('IncorporacionDetailComponent', () => {
  let component: IncorporacionDetailComponent;
  let fixture: ComponentFixture<IncorporacionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorporacionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorporacionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
