import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaCreateComponent } from './compania-create.component';

describe('CompaniaCreateComponent', () => {
  let component: CompaniaCreateComponent;
  let fixture: ComponentFixture<CompaniaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
