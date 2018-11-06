import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaIndexComponent } from './compania-index.component';

describe('CompaniaIndexComponent', () => {
  let component: CompaniaIndexComponent;
  let fixture: ComponentFixture<CompaniaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
