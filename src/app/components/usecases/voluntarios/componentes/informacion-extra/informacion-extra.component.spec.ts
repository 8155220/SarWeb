import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionExtraComponent } from './informacion-extra.component';

describe('InformacionExtraComponent', () => {
  let component: InformacionExtraComponent;
  let fixture: ComponentFixture<InformacionExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
