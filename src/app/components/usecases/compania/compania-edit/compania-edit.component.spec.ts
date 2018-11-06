import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaEditComponent } from './compania-edit.component';

describe('CompaniaEditComponent', () => {
  let component: CompaniaEditComponent;
  let fixture: ComponentFixture<CompaniaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
